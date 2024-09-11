/******************************************************************************
 * This file was generated by langium-cli 3.2.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

/* eslint-disable */
import type { AstNode, Reference, ReferenceInfo, TypeMetaData } from 'langium';
import { AbstractAstReflection } from 'langium';

export const ArithmeticsTerminals = {
    S_Byte_Char_Str: /('(((((((((((((((((((((( |!)|#)|%)|&)|[\(-/])|[0-9])|[:-@])|[A-Z])|[\[-`])|[a-z])|[\{-~])|\$\$)|\$L)|\$N)|\$P)|\$R)|\$T))|\$')|")|(\$([0-9a-fA-F])([0-9a-fA-F]))))*')/,
    D_Byte_Char_Str: /("(((((((((((((((((((((( |!)|#)|%)|&)|[\(-/])|[0-9])|[:-@])|[A-Z])|[\[-`])|[a-z])|[\{-~])|\$\$)|\$L)|\$N)|\$P)|\$R)|\$T))|')|\$")|(\$([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F]))))*")/,
    Binary_Int: /(2#(_?([0-1]))+)/,
    WS: /\s+/,
    ID: /[_a-zA-Z][\w_]*/,
    NUMBER: /[0-9]+(\.[0-9]*)?/,
    ML_COMMENT: /\/\*[\s\S]*?\*\//,
    SL_COMMENT: /\/\/[^\n\r]*/,
};

export type ArithmeticsTerminalNames = keyof typeof ArithmeticsTerminals;

export type ArithmeticsKeywordNames = 
    | "!"
    | "%"
    | "("
    | ")"
    | "*"
    | "**"
    | "+"
    | ","
    | "-"
    | "."
    | ".."
    | "/"
    | ":"
    | ":="
    | ";"
    | "["
    | "]"
    | "^"
    | "any"
    | "any_array"
    | "array"
    | "bool"
    | "byte"
    | "date"
    | "date_and_time"
    | "dint"
    | "dword"
    | "end_struct"
    | "false"
    | "function"
    | "int"
    | "lint"
    | "lreal"
    | "lword"
    | "of"
    | "real"
    | "sint"
    | "string"
    | "struct"
    | "time"
    | "time_of_day"
    | "true"
    | "typed"
    | "udint"
    | "uint"
    | "ulint"
    | "usint"
    | "word"
    | "wstring";

export type ArithmeticsTokenNames = ArithmeticsTerminalNames | ArithmeticsKeywordNames;

export type AbstractDefinition = Definition | Parameter;

export const AbstractDefinition = 'AbstractDefinition';

export function isAbstractDefinition(item: unknown): item is AbstractDefinition {
    return reflection.isInstance(item, AbstractDefinition);
}

export type Definition = FunctionDeclaration | NamedElement | VariableDeclaration;

export const Definition = 'Definition';

export function isDefinition(item: unknown): item is Definition {
    return reflection.isInstance(item, Definition);
}

export type ExitStatement = Subrange;

export const ExitStatement = 'ExitStatement';

export function isExitStatement(item: unknown): item is ExitStatement {
    return reflection.isInstance(item, ExitStatement);
}

export type Expression = BinaryExpression | BooleanExpression | FunctionCall | MemberCall | NumberExpression | NumberLiteral | UnaryExpression;

export const Expression = 'Expression';

export function isExpression(item: unknown): item is Expression {
    return reflection.isInstance(item, Expression);
}

export type NamedElement = FunctionDeclaration | Parameter | StructMember | StructTypeDeclaration | VariableDeclaration;

export const NamedElement = 'NamedElement';

export function isNamedElement(item: unknown): item is NamedElement {
    return reflection.isInstance(item, NamedElement);
}

export type Statement = Definition | Evaluation;

export const Statement = 'Statement';

export function isStatement(item: unknown): item is Statement {
    return reflection.isInstance(item, Statement);
}

export interface ArrayInitialization extends AstNode {
    readonly $container: VariableDeclaration;
    readonly $type: 'ArrayInitialization';
    elements: Array<Expression>;
}

export const ArrayInitialization = 'ArrayInitialization';

export function isArrayInitialization(item: unknown): item is ArrayInitialization {
    return reflection.isInstance(item, ArrayInitialization);
}

export interface BinaryExpression extends AstNode {
    readonly $container: ArrayInitialization | BinaryExpression | Evaluation | FunctionCall | FunctionDeclaration | MemberCall | UnaryExpression | VariableDeclaration;
    readonly $type: 'BinaryExpression';
    left?: Expression;
    op?: '**';
    operator?: '%' | '*' | '+' | '-' | '/' | '^';
    right?: Expression;
    value?: string;
}

export const BinaryExpression = 'BinaryExpression';

export function isBinaryExpression(item: unknown): item is BinaryExpression {
    return reflection.isInstance(item, BinaryExpression);
}

export interface BooleanExpression extends AstNode {
    readonly $container: ArrayInitialization | BinaryExpression | Evaluation | FunctionCall | FunctionDeclaration | MemberCall | UnaryExpression | VariableDeclaration;
    readonly $type: 'BooleanExpression';
    value: boolean;
}

export const BooleanExpression = 'BooleanExpression';

export function isBooleanExpression(item: unknown): item is BooleanExpression {
    return reflection.isInstance(item, BooleanExpression);
}

export interface Evaluation extends AstNode {
    readonly $container: Module;
    readonly $type: 'Evaluation';
    expression: Expression;
}

export const Evaluation = 'Evaluation';

export function isEvaluation(item: unknown): item is Evaluation {
    return reflection.isInstance(item, Evaluation);
}

export interface FunctionCall extends AstNode {
    readonly $container: ArrayInitialization | BinaryExpression | Evaluation | FunctionCall | FunctionDeclaration | MemberCall | UnaryExpression | VariableDeclaration;
    readonly $type: 'FunctionCall';
    args: Array<Expression>;
    func: Reference<AbstractDefinition>;
}

export const FunctionCall = 'FunctionCall';

export function isFunctionCall(item: unknown): item is FunctionCall {
    return reflection.isInstance(item, FunctionCall);
}

export interface FunctionDeclaration extends AstNode {
    readonly $container: Module;
    readonly $type: 'FunctionDeclaration';
    args: Array<Parameter>;
    expr: Expression;
    name: string;
}

export const FunctionDeclaration = 'FunctionDeclaration';

export function isFunctionDeclaration(item: unknown): item is FunctionDeclaration {
    return reflection.isInstance(item, FunctionDeclaration);
}

export interface MemberCall extends AstNode {
    readonly $container: ArrayInitialization | BinaryExpression | Evaluation | FunctionCall | FunctionDeclaration | MemberCall | UnaryExpression | VariableDeclaration;
    readonly $type: 'MemberCall';
    element: Reference<NamedElement>;
    previous: Expression;
}

export const MemberCall = 'MemberCall';

export function isMemberCall(item: unknown): item is MemberCall {
    return reflection.isInstance(item, MemberCall);
}

export interface Module extends AstNode {
    readonly $type: 'Module';
    statements: Array<Statement>;
}

export const Module = 'Module';

export function isModule(item: unknown): item is Module {
    return reflection.isInstance(item, Module);
}

export interface NumberExpression extends AstNode {
    readonly $container: ArrayInitialization | BinaryExpression | Evaluation | FunctionCall | FunctionDeclaration | MemberCall | UnaryExpression | VariableDeclaration;
    readonly $type: 'NumberExpression';
    value: number;
}

export const NumberExpression = 'NumberExpression';

export function isNumberExpression(item: unknown): item is NumberExpression {
    return reflection.isInstance(item, NumberExpression);
}

export interface NumberLiteral extends AstNode {
    readonly $container: ArrayInitialization | BinaryExpression | Evaluation | FunctionCall | FunctionDeclaration | MemberCall | UnaryExpression | VariableDeclaration;
    readonly $type: 'NumberLiteral';
    value: number;
}

export const NumberLiteral = 'NumberLiteral';

export function isNumberLiteral(item: unknown): item is NumberLiteral {
    return reflection.isInstance(item, NumberLiteral);
}

export interface Parameter extends AstNode {
    readonly $container: FunctionDeclaration | Module;
    readonly $type: 'Parameter';
    name: string;
    type: TypeReference;
}

export const Parameter = 'Parameter';

export function isParameter(item: unknown): item is Parameter {
    return reflection.isInstance(item, Parameter);
}

export interface String_Type extends AstNode {
    readonly $container: StructMember | VariableDeclaration;
    readonly $type: 'String_Type';
    value: 'string' | 'wstring';
}

export const String_Type = 'String_Type';

export function isString_Type(item: unknown): item is String_Type {
    return reflection.isInstance(item, String_Type);
}

export interface StringExpression extends AstNode {
    readonly $container: VariableDeclaration;
    readonly $type: 'StringExpression';
    value?: string;
}

export const StringExpression = 'StringExpression';

export function isStringExpression(item: unknown): item is StringExpression {
    return reflection.isInstance(item, StringExpression);
}

export interface StructMember extends AstNode {
    readonly $container: Module | StructTypeDeclaration;
    readonly $type: 'StructMember';
    length?: number;
    name: string;
    type: String_Type | TypeReference;
}

export const StructMember = 'StructMember';

export function isStructMember(item: unknown): item is StructMember {
    return reflection.isInstance(item, StructMember);
}

export interface StructTypeDeclaration extends AstNode {
    readonly $container: Module;
    readonly $type: 'StructTypeDeclaration';
    members: Array<StructMember>;
    name: string;
}

export const StructTypeDeclaration = 'StructTypeDeclaration';

export function isStructTypeDeclaration(item: unknown): item is StructTypeDeclaration {
    return reflection.isInstance(item, StructTypeDeclaration);
}

export interface Subrange extends AstNode {
    readonly $container: VariableDeclaration;
    readonly $type: 'Subrange';
    from: number;
    to: number;
}

export const Subrange = 'Subrange';

export function isSubrange(item: unknown): item is Subrange {
    return reflection.isInstance(item, Subrange);
}

export interface TypeReference extends AstNode {
    readonly $container: Parameter | StructMember | VariableDeclaration;
    readonly $type: 'TypeReference';
    any_type?: 'any' | 'any_array';
    bool_type?: 'bool';
    bytes_type?: 'byte' | 'dword' | 'lword' | 'word';
    datetime_type?: 'date' | 'date_and_time' | 'time' | 'time_of_day';
    real_type?: 'lreal' | 'real';
    reference?: Reference<NamedElement>;
    sign_int_type?: 'dint' | 'int' | 'lint' | 'sint';
    unsign_int_type?: 'udint' | 'uint' | 'ulint' | 'usint';
}

export const TypeReference = 'TypeReference';

export function isTypeReference(item: unknown): item is TypeReference {
    return reflection.isInstance(item, TypeReference);
}

export interface UnaryExpression extends AstNode {
    readonly $container: ArrayInitialization | BinaryExpression | Evaluation | FunctionCall | FunctionDeclaration | MemberCall | UnaryExpression | VariableDeclaration;
    readonly $type: 'UnaryExpression';
    operator: '!' | '+' | '-';
    value: Expression;
}

export const UnaryExpression = 'UnaryExpression';

export function isUnaryExpression(item: unknown): item is UnaryExpression {
    return reflection.isInstance(item, UnaryExpression);
}

export interface VariableDeclaration extends AstNode {
    readonly $container: Module;
    readonly $type: 'ExitStatement' | 'FunctionDeclaration' | 'NamedElement' | 'Parameter' | 'StructMember' | 'StructTypeDeclaration' | 'Subrange' | 'VariableDeclaration';
    dimension: Array<ExitStatement>;
    hasInitialValue: boolean;
    hasRange: boolean;
    length?: number;
    name: string;
    type: String_Type | TypeReference;
    value?: ArrayInitialization | Expression | StringExpression;
}

export const VariableDeclaration = 'VariableDeclaration';

export function isVariableDeclaration(item: unknown): item is VariableDeclaration {
    return reflection.isInstance(item, VariableDeclaration);
}

export type ArithmeticsAstType = {
    AbstractDefinition: AbstractDefinition
    ArrayInitialization: ArrayInitialization
    BinaryExpression: BinaryExpression
    BooleanExpression: BooleanExpression
    Definition: Definition
    Evaluation: Evaluation
    ExitStatement: ExitStatement
    Expression: Expression
    FunctionCall: FunctionCall
    FunctionDeclaration: FunctionDeclaration
    MemberCall: MemberCall
    Module: Module
    NamedElement: NamedElement
    NumberExpression: NumberExpression
    NumberLiteral: NumberLiteral
    Parameter: Parameter
    Statement: Statement
    StringExpression: StringExpression
    String_Type: String_Type
    StructMember: StructMember
    StructTypeDeclaration: StructTypeDeclaration
    Subrange: Subrange
    TypeReference: TypeReference
    UnaryExpression: UnaryExpression
    VariableDeclaration: VariableDeclaration
}

export class ArithmeticsAstReflection extends AbstractAstReflection {

    getAllTypes(): string[] {
        return [AbstractDefinition, ArrayInitialization, BinaryExpression, BooleanExpression, Definition, Evaluation, ExitStatement, Expression, FunctionCall, FunctionDeclaration, MemberCall, Module, NamedElement, NumberExpression, NumberLiteral, Parameter, Statement, StringExpression, String_Type, StructMember, StructTypeDeclaration, Subrange, TypeReference, UnaryExpression, VariableDeclaration];
    }

    protected override computeIsSubtype(subtype: string, supertype: string): boolean {
        console.log(`computeIsSubtype called with subtype: ${subtype}, supertype: ${supertype}`);
        switch (subtype) {
            case BinaryExpression:
            case BooleanExpression:
            case FunctionCall:
            case MemberCall:
            case NumberExpression:
            case NumberLiteral:
            case UnaryExpression: {
                return this.isSubtype(Expression, supertype);
            }
            case Definition: {
                return this.isSubtype(AbstractDefinition, supertype) || this.isSubtype(Statement, supertype);
            }
            case Evaluation: {
                return this.isSubtype(Statement, supertype);
            }
            case ExitStatement: {
                return this.isSubtype(VariableDeclaration, supertype);
            }
            case FunctionDeclaration:
            case VariableDeclaration: {
                return this.isSubtype(Definition, supertype) || this.isSubtype(NamedElement, supertype);
            }
            case NamedElement: {
                return this.isSubtype(Definition, supertype) || this.isSubtype(VariableDeclaration, supertype);
            }
            case Parameter: {
                return this.isSubtype(AbstractDefinition, supertype) || this.isSubtype(NamedElement, supertype);
            }
            case StructMember:
            case StructTypeDeclaration: {
                return this.isSubtype(NamedElement, supertype);
            }
            case Subrange: {
                return this.isSubtype(ExitStatement, supertype);
            }
            default: {
                return false;
            }
        }
    }

    getReferenceType(refInfo: ReferenceInfo): string {
        const referenceId = `${refInfo.container.$type}:${refInfo.property}`;
        switch (referenceId) {
            case 'FunctionCall:func': {
                return AbstractDefinition;
            }
            case 'MemberCall:element':
            case 'TypeReference:reference': {
                return NamedElement;
            }
            default: {
                throw new Error(`${referenceId} is not a valid reference id.`);
            }
        }
    }

    getTypeMetaData(type: string): TypeMetaData {
        switch (type) {
            case ArrayInitialization: {
                return {
                    name: ArrayInitialization,
                    properties: [
                        { name: 'elements', defaultValue: [] }
                    ]
                };
            }
            case BinaryExpression: {
                return {
                    name: BinaryExpression,
                    properties: [
                        { name: 'left' },
                        { name: 'op' },
                        { name: 'operator' },
                        { name: 'right' },
                        { name: 'value' }
                    ]
                };
            }
            case BooleanExpression: {
                return {
                    name: BooleanExpression,
                    properties: [
                        { name: 'value', defaultValue: false }
                    ]
                };
            }
            case Evaluation: {
                return {
                    name: Evaluation,
                    properties: [
                        { name: 'expression' }
                    ]
                };
            }
            case FunctionCall: {
                return {
                    name: FunctionCall,
                    properties: [
                        { name: 'args', defaultValue: [] },
                        { name: 'func' }
                    ]
                };
            }
            case FunctionDeclaration: {
                return {
                    name: FunctionDeclaration,
                    properties: [
                        { name: 'args', defaultValue: [] },
                        { name: 'expr' },
                        { name: 'name' }
                    ]
                };
            }
            case MemberCall: {
                return {
                    name: MemberCall,
                    properties: [
                        { name: 'element' },
                        { name: 'previous' }
                    ]
                };
            }
            case Module: {
                return {
                    name: Module,
                    properties: [
                        { name: 'statements', defaultValue: [] }
                    ]
                };
            }
            case NumberExpression: {
                return {
                    name: NumberExpression,
                    properties: [
                        { name: 'value' }
                    ]
                };
            }
            case NumberLiteral: {
                return {
                    name: NumberLiteral,
                    properties: [
                        { name: 'value' }
                    ]
                };
            }
            case Parameter: {
                return {
                    name: Parameter,
                    properties: [
                        { name: 'name' },
                        { name: 'type' }
                    ]
                };
            }
            case String_Type: {
                return {
                    name: String_Type,
                    properties: [
                        { name: 'value' }
                    ]
                };
            }
            case StringExpression: {
                return {
                    name: StringExpression,
                    properties: [
                        { name: 'value' }
                    ]
                };
            }
            case StructMember: {
                return {
                    name: StructMember,
                    properties: [
                        { name: 'length' },
                        { name: 'name' },
                        { name: 'type' }
                    ]
                };
            }
            case StructTypeDeclaration: {
                return {
                    name: StructTypeDeclaration,
                    properties: [
                        { name: 'members', defaultValue: [] },
                        { name: 'name' }
                    ]
                };
            }
            case Subrange: {
                return {
                    name: Subrange,
                    properties: [
                        { name: 'from' },
                        { name: 'to' }
                    ]
                };
            }
            case TypeReference: {
                return {
                    name: TypeReference,
                    properties: [
                        { name: 'any_type' },
                        { name: 'bool_type' },
                        { name: 'bytes_type' },
                        { name: 'datetime_type' },
                        { name: 'real_type' },
                        { name: 'reference' },
                        { name: 'sign_int_type' },
                        { name: 'unsign_int_type' }
                    ]
                };
            }
            case UnaryExpression: {
                return {
                    name: UnaryExpression,
                    properties: [
                        { name: 'operator' },
                        { name: 'value' }
                    ]
                };
            }
            case VariableDeclaration: {
                return {
                    name: VariableDeclaration,
                    properties: [
                        { name: 'dimension', defaultValue: [] },
                        { name: 'hasInitialValue', defaultValue: false },
                        { name: 'hasRange', defaultValue: false },
                        { name: 'length' },
                        { name: 'name' },
                        { name: 'type' },
                        { name: 'value' }
                    ]
                };
            }
            default: {
                return {
                    name: type,
                    properties: []
                };
            }
        }
    }
}

export const reflection = new ArithmeticsAstReflection();
