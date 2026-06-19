export interface Fraction {
  numerator: number
  denominator: number
}

/** Greatest common divisor (always non-negative). */
export function gcd(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b !== 0) {
    ;[a, b] = [b, a % b]
  }
  return a || 1
}

/** Ensure denominator > 0 and fraction is reduced. */
export function simplify(f: Fraction): Fraction {
  if (f.denominator === 0) {
    throw new Error('Denominator cannot be zero')
  }
  let { numerator: n, denominator: d } = f
  if (d < 0) {
    n = -n
    d = -d
  }
  const g = gcd(n, d)
  return { numerator: n / g, denominator: d / g }
}

export function fromNumber(n: number): Fraction {
  return { numerator: n, denominator: 1 }
}

export function isZero(f: Fraction): boolean {
  return f.numerator === 0
}

export function isTwentyFour(f: Fraction): boolean {
  const s = simplify(f)
  return s.numerator === 24 * s.denominator
}

export function add(a: Fraction, b: Fraction): Fraction {
  return simplify({
    numerator: a.numerator * b.denominator + b.numerator * a.denominator,
    denominator: a.denominator * b.denominator,
  })
}

export function subtract(a: Fraction, b: Fraction): Fraction {
  return simplify({
    numerator: a.numerator * b.denominator - b.numerator * a.denominator,
    denominator: a.denominator * b.denominator,
  })
}

export function multiply(a: Fraction, b: Fraction): Fraction {
  return simplify({
    numerator: a.numerator * b.numerator,
    denominator: a.denominator * b.denominator,
  })
}

/** Returns null when divisor is zero. */
export function divide(a: Fraction, b: Fraction): Fraction | null {
  if (isZero(b)) return null
  return simplify({
    numerator: a.numerator * b.denominator,
    denominator: a.denominator * b.numerator,
  })
}

export function fractionToString(f: Fraction): string {
  const s = simplify(f)
  if (s.denominator === 1) return `${s.numerator}`
  return `${s.numerator}/${s.denominator}`
}

export function fractionEquals(a: Fraction, b: Fraction): boolean {
  const sa = simplify(a)
  const sb = simplify(b)
  return sa.numerator === sb.numerator && sa.denominator === sb.denominator
}
