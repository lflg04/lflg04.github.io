import {
  type Fraction,
  add,
  divide,
  fractionToString,
  fromNumber,
  isTwentyFour,
  multiply,
  subtract,
} from './fraction'

interface SolverOperand {
  value: Fraction
  /** Human-readable infix expression with parentheses when needed. */
  expr: string
}

const OP_SYMBOLS: Record<string, string> = {
  add: '+',
  sub: '−',
  rsub: '−',
  mul: '×',
  div: '÷',
  rdiv: '÷',
}

function parens(inner: string): string {
  return `(${inner})`
}

function combine(
  a: SolverOperand,
  b: SolverOperand,
  op: string,
): SolverOperand | null {
  let value: Fraction | null = null
  let expr: string

  switch (op) {
    case 'add':
      value = add(a.value, b.value)
      expr = `${a.expr} + ${b.expr}`
      break
    case 'sub':
      value = subtract(a.value, b.value)
      expr = `${a.expr} − ${b.expr}`
      break
    case 'rsub':
      value = subtract(b.value, a.value)
      expr = `${b.expr} − ${a.expr}`
      break
    case 'mul':
      value = multiply(a.value, b.value)
      // Only add parens around operands that are sums or differences
      expr = `${maybeParens(a.expr)} × ${maybeParens(b.expr)}`
      break
    case 'div': {
      value = divide(a.value, b.value)
      if (!value) return null
      expr = `${maybeParens(a.expr)} ÷ ${maybeParens(b.expr)}`
      break
    }
    case 'rdiv': {
      value = divide(b.value, a.value)
      if (!value) return null
      expr = `${maybeParens(b.expr)} ÷ ${maybeParens(a.expr)}`
      break
    }
    default:
      return null
  }
  return { value, expr }
}

/**
 * Wrap expression in parentheses if it contains +, −, ×, or ÷
 * (i.e., it's a compound expression).
 */
function maybeParens(expr: string): string {
  if (/[+−×÷]/.test(expr)) {
    return parens(expr)
  }
  return expr
}

/**
 * Recursively solve the 24 game.
 * Returns a human-readable expression string, or null if unsolvable.
 */
function solveRecursive(operands: SolverOperand[]): string | null {
  if (operands.length === 1) {
    if (isTwentyFour(operands[0].value)) {
      return operands[0].expr
    }
    return null
  }

  for (let i = 0; i < operands.length; i++) {
    for (let j = i + 1; j < operands.length; j++) {
      const remaining = operands.filter((_, idx) => idx !== i && idx !== j)
      const a = operands[i]
      const b = operands[j]

      // Try all operations. Addition and multiplication are commutative,
      // so we only need one direction for those.
      const ops = ['add', 'sub', 'rsub', 'mul', 'div', 'rdiv']

      for (const op of ops) {
        const result = combine(a, b, op)
        if (!result) continue

        const answer = solveRecursive([...remaining, result])
        if (answer !== null) return answer
      }
    }
  }

  return null
}

/**
 * Given four numbers between 1–9, return a solution expression
 * (e.g. "8 ÷ (3 − 8 ÷ 3)") or null if unsolvable.
 */
export function solve24(numbers: number[]): string | null {
  if (numbers.length !== 4) return null
  const operands: SolverOperand[] = numbers.map((n) => ({
    value: fromNumber(n),
    expr: `${n}`,
  }))
  return solveRecursive(operands)
}

/**
 * Generate four numbers that have at least one valid 24-point solution.
 * Each number is in the range 1–9 (inclusive).
 * Uses rejection sampling with a safety limit.
 */
export function generatePuzzle(): number[] {
  const MAX_ATTEMPTS = 500
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const nums = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 9) + 1,
    )
    if (solve24(nums) !== null) {
      return nums
    }
  }
  // Fallback: well-known solvable puzzle
  return [1, 2, 3, 4]
}
