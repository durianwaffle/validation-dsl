/******************************************************************************
 * Copyright 2021 TypeFox GmbH
 * This program and the accompanying materials are made available under the
 * terms of the MIT License, which is available in the project root.
 ******************************************************************************/

import type { ValidationAcceptor, ValidationChecks } from 'langium';
import { MultiMap } from 'langium';
import { evalExpression } from './arithmetics-evaluator.js';
import type { ArithmeticsServices } from './arithmetics-module.js';
import { applyOp, isResolvedFunctionCall } from './arithmetics-util.js';
import type { ArithmeticsAstType, BinaryExpression, Definition, Expression, FunctionCall, FunctionDeclaration, Module, Parameter } from './generated/ast.js';
import { isBinaryExpression, isDefinition, isNumberLiteral } from './generated/ast.js';

export function registerValidationChecks(services: ArithmeticsServices): void {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.ArithmeticsValidator;
    const checks: ValidationChecks<ArithmeticsAstType> = {
        BinaryExpression: validator.checkDivByZero,
        Definition: [validator.checkUniqueParameters, validator.checkNormalisable],
        Module: [validator.checkUniqueDefinitions],
        FunctionCall: validator.checkMatchingParameters,
    };
    registry.register(checks, validator);
}

export class ArithmeticsValidator {
    checkDivByZero(binExpr: BinaryExpression, accept: ValidationAcceptor): void {
        if (binExpr.operator === '/' || binExpr.operator === '%') {
            if ((binExpr.right) && (evalExpression(binExpr.right) === 0)) {
                accept('error', 'Division by zero is detected.', { node: binExpr, property: 'right' });
            }
        }
    }

    checkNormalisable(def: Definition, accept: ValidationAcceptor): void {
        const context = new Map<Expression, number>();

        const makeOp = (expr: BinaryExpression, op: (x: number, y: number) => number): void => {
            const subExprs = [expr.left, expr.right];
            subExprs.forEach(e => {
                if (e !== undefined) {
                    evalExpr(e);
                }
            });
            const [left, right] = subExprs.map(e => {
                if (e !== undefined) {
                    return isNumberLiteral(e) ? e.value : context.get(e);
                } else {
                    return undefined;
                }
            });
            if (left !== undefined && right !== undefined && op(left, right).toString().length <= 8) {
                context.set(expr, op(left, right));
                subExprs.forEach(e => {
                    if (e !== undefined) {
                        context.delete(e);
                    }
                });
            }
        };

        const evalExpr = (expr: Expression): void => {
            if (isBinaryExpression(expr)) {
                makeOp(expr as BinaryExpression, applyOp(expr.operator));
            }
        };
        if (def.$type === 'FunctionDeclaration'){
            def = def as FunctionDeclaration;
            evalExpr(def.expr);
        }
        for (const [expr, result] of context) {
            if (result) {
                accept('warning', 'Expression could be normalized to constant ' + result, { node: expr });
            }
        }
    }

    checkUniqueDefinitions(module: Module, accept: ValidationAcceptor): void {
        const names = new MultiMap<string, Definition>();
        for (const def of module.statements) {
            if (isDefinition(def) && def.name) {
                names.add(def.name, def);
            }
        }
        for (const [name, symbols] of names.entriesGroupedByKey()) {
            if (symbols.length > 1) {
                for (const symbol of symbols) {
                    accept('error', `Duplicate definition name: ${name}`, { node: symbol, property: 'name' });
                }
            }
        }
    }

    checkUniqueParameters(definition: Definition, accept: ValidationAcceptor): void {
        const names = new MultiMap<string, Parameter>();
        if (definition.$type === 'FunctionDeclaration'){
            definition = definition as FunctionDeclaration;
            for (const def of definition.args) {
                if (def.name) {
                    names.add(def.name, def);
                }
            }
            for (const [name, symbols] of names.entriesGroupedByKey()) {
                if (symbols.length > 1) {
                    for (const symbol of symbols) {
                        accept('error', `Duplicate definition name: ${name}`, { node: symbol, property: 'name' });
                    }
                }
            }
        }
    }

    checkMatchingParameters(functionCall: FunctionCall, accept: ValidationAcceptor): void {
        if (!isResolvedFunctionCall(functionCall)
            || functionCall.func.ref.$type !== 'FunctionDeclaration') {
            return;
        }
        const ref = functionCall.func.ref as FunctionDeclaration;
        if (functionCall.args.length !== ref.args.length) {
            accept('error', `Function ${functionCall.func.ref.name} expects ${ref.args.length} parameters, but ${functionCall.args.length} were given.`, { node: functionCall, property: 'args' });
        }
    }
}
