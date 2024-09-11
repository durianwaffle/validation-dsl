grammar Arithmetics

entry Module:
    (statements+=Statement)*;

Statement:
    Definition | Evaluation;

Definition:
    FunctionDeclaration |
    StructTypeDeclaration |
    VariableDeclaration ;

FunctionDeclaration:
    'function' name=ID ('(' args+=Parameter (',' args+=Parameter)* ')')?
    ':' expr=Expression ';';


StructTypeDeclaration returns NamedElement:
    {infer StructTypeDeclaration}
    'typed' name=ID ':' 
    'struct'
    members+= StructMember*
    'end_struct' ';'   
;

VariableDeclaration:
   SimpleVariableDeclaration | ArrayVariableDeclaration |StringVariableDeclaration
;

SimpleVariableDeclaration returns NamedElement:
    {infer VariableDeclaration} 
    name=ID
    ':' type=TypeReference 
    (hasInitialValue?=':=' value=Expression)? 
    (hasRange?= '(' Subrange ')')?
;

ArrayVariableDeclaration returns NamedElement:
    {infer VariableDeclaration} 
    name=ID 
 //   ':' (type=TypeReference)  ('[' dimension+=Subrange (','dimension+=Subrange)* ']')?
    ':' 'array' '[' dimension+=Subrange (','dimension+=Subrange)* ']' 'of' type=TypeReference   
    (hasInitialValue?=':=' value= ArrayInitialization)?    
;

ArrayInitialization:
     '[' elements+=Expression (',' elements+=Expression )* ']'
;

StringVariableDeclaration returns NamedElement:
    {infer VariableDeclaration} 
    name=ID 
    ':' (type=String_Type ) '[' length=NUMBER']'
    (hasInitialValue?=':=' value= StringExpression)?
;

StringExpression: value = S_Byte_Char_Str|D_Byte_Char_Str;

terminal S_Byte_Char_Str:
	'\'' S_Byte_Char_Value* '\'';

terminal D_Byte_Char_Str:
	'"' D_Byte_Char_Value* '"';

type AbstractDefinition = Definition | Parameter;

Evaluation:
    expression=Expression ';';

Expression:
    Addition;

UnaryExpression:
   operator=('!' | '-' | '+') value=Expression
;
NumberExpression: value=NUMBER;
BooleanExpression: value?='true' | 'false';

MemberCall infers Expression:
    Primary
	({infer MemberCall.previous=current} '.' element=[NamedElement:ID]
    )*
;
type NamedElement = Parameter | FunctionDeclaration | VariableDeclaration | StructMember | StructTypeDeclaration ;

StructMember:
    name=ID ':' type=TypeReference ';' |
	name=ID 
    ':' (type=String_Type ) '[' length=NUMBER']' ';'
;

terminal fragment Hex_Digit:/[0-9a-fA-F]/;

terminal fragment S_Byte_Char_Value:
	Common_Char_Value | '$\'' | '"' | '$' Hex_Digit Hex_Digit;

terminal fragment D_Byte_Char_Value:
	Common_Char_Value | '\'' | '$"' | '$' Hex_Digit Hex_Digit Hex_Digit Hex_Digit;

terminal fragment Common_Char_Value:
	' ' | '!' | '#' | '%' | '&' | /[\(-/]/ | /[0-9]/ | /[:-@]/ | /[A-Z]/ | /[\[-`]/ | /[a-z]/ | /[\{-~]/
	| '$$' | '$L' | '$N' | '$P' | '$R' | '$T';

Subrange infers ExitStatement:
  {infer Subrange}
  from=NUMBER '..' to=NUMBER
;

String_Type: value=('string'|'wstring');

Parameter: name=ID ':' type=TypeReference;

TypeReference:     	
    sign_int_type=('int'|'sint'|'dint'|'lint')
    |
    unsign_int_type=('usint'|'uint'|'udint'|'ulint')
    |
    real_type=('real'|'lreal')
    |
	datetime_type= ('time'|'date'|'time_of_day'|'date_and_time')
    //|
   // String_Type 
    |
    bool_type=('bool')
    |
    bytes_type=('byte'|'word'|'dword'|'lword')
	|
	any_type=('any'|'any_array')
	|
    reference= [NamedElement:ID] 
;

BinaryExpression: value=Binary_Int;

Addition infers Expression:
    Multiplication ({infer BinaryExpression.left=current} operator=('+' | '-') right=Multiplication)*;

Multiplication infers Expression:
    Exponentiation ({infer BinaryExpression.left=current} operator=('*' | '/') right=Exponentiation)*;

Exponentiation infers Expression:
    Modulo ({infer BinaryExpression.left=current} operator='^' right=Modulo)*;

Modulo infers Expression:
    PrimaryExpression ({infer BinaryExpression.left=current} operator='%' right=Pow)*;

Pow infers Expression:
    MemberCall ({infer BinaryExpression.left=current} op="**" right=MemberCall)*;

PrimaryExpression infers Expression:
    '(' Expression ')' |
    {infer NumberLiteral} value=NUMBER |
    {infer FunctionCall} func=[AbstractDefinition] ('(' args+=Expression (',' args+=Expression)* ')')?;

Primary infers Expression:
    '(' Expression ')' |
    UnaryExpression |    
    BooleanExpression |
    NumberExpression |
    BinaryExpression
 ;
terminal Binary_Int:
	'2#' ('_'? Bit)+;
terminal fragment Bit: /[0-1]/;	
hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal NUMBER returns number: /[0-9]+(\.[0-9]*)?/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
