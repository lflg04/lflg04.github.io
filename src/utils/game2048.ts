// ── Types ──

export type Board = number[][]

export type Direction = 'up' | 'down' | 'left' | 'right'

export interface MoveResult {
  board: Board
  scoreGained: number
  moved: boolean
}

export type GameStatus = 'playing' | 'won' | 'game-over'

export interface GameSnapshot {
  board: Board
  score: number
  hasWon: boolean
  keepPlayingAfterWin: boolean
}

export interface GameState {
  board: Board
  score: number
  bestScore: number
  status: GameStatus
  hasWon: boolean
  keepPlayingAfterWin: boolean
  history: GameSnapshot[]
}

// ── Board utilities ──

export function createEmptyBoard(size = 4): Board {
  return Array.from({ length: size }, () => Array(size).fill(0))
}

export function cloneBoard(board: Board): Board {
  return board.map(row => [...row])
}

export function boardsEqual(a: Board, b: Board): boolean {
  if (a.length !== b.length) return false
  for (let r = 0; r < a.length; r++) {
    if (a[r].length !== b[r].length) return false
    for (let c = 0; c < a[r].length; c++) {
      if (a[r][c] !== b[r][c]) return false
    }
  }
  return true
}

// ── Core merge logic ──

/**
 * Compress a single row/column line toward the left.
 * 1. Remove all zeros (compact)
 * 2. Merge adjacent equal tiles from left to right
 * 3. Pad with zeros to the original length
 *
 * Returns the resulting line and the score gained from merges.
 */
export function compressAndMergeLine(line: number[]): {
  line: number[]
  scoreGained: number
} {
  const len = line.length

  // Step 1: Remove zeros
  const nonZero = line.filter(v => v !== 0)

  // Step 2: Merge adjacent equal values from left to right
  let scoreGained = 0
  const merged: number[] = []
  let i = 0
  while (i < nonZero.length) {
    if (i + 1 < nonZero.length && nonZero[i] === nonZero[i + 1]) {
      const newValue = nonZero[i] * 2
      merged.push(newValue)
      scoreGained += newValue
      i += 2
    } else {
      merged.push(nonZero[i])
      i += 1
    }
  }

  // Step 3: Pad with zeros
  while (merged.length < len) {
    merged.push(0)
  }

  return { line: merged, scoreGained }
}

// ── Board movement ──

/**
 * Apply a directional move to the board.
 * Returns the new board, score gained, and whether anything moved.
 *
 * Uses row/column extraction so all four directions share the same
 * `compressAndMergeLine` logic.
 */
export function moveBoard(board: Board, direction: Direction): MoveResult {
  const size = board.length
  let scoreGained = 0
  const result: Board = createEmptyBoard(size)

  if (direction === 'left') {
    for (let r = 0; r < size; r++) {
      const { line, scoreGained: s } = compressAndMergeLine(board[r])
      result[r] = line
      scoreGained += s
    }
  } else if (direction === 'right') {
    for (let r = 0; r < size; r++) {
      // Reverse, compress left, reverse back
      const reversed = [...board[r]].reverse()
      const { line, scoreGained: s } = compressAndMergeLine(reversed)
      result[r] = line.reverse()
      scoreGained += s
    }
  } else if (direction === 'up') {
    for (let c = 0; c < size; c++) {
      const col = board.map(row => row[c])
      const { line, scoreGained: s } = compressAndMergeLine(col)
      for (let r = 0; r < size; r++) {
        result[r][c] = line[r]
      }
      scoreGained += s
    }
  } else if (direction === 'down') {
    for (let c = 0; c < size; c++) {
      const col = board.map(row => row[c]).reverse()
      const { line, scoreGained: s } = compressAndMergeLine(col)
      const reversed = line.reverse()
      for (let r = 0; r < size; r++) {
        result[r][c] = reversed[r]
      }
      scoreGained += s
    }
  }

  const moved = !boardsEqual(board, result)
  return { board: result, scoreGained, moved }
}

// ── Random tile generation ──

export function getEmptyCells(
  board: Board,
): Array<{ row: number; col: number }> {
  const cells: Array<{ row: number; col: number }> = []
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] === 0) {
        cells.push({ row: r, col: c })
      }
    }
  }
  return cells
}

/**
 * Add a random tile (90% chance 2, 10% chance 4) to a random empty cell.
 * If no empty cells exist, returns the board unchanged.
 *
 * The `random` parameter can be injected for testing.
 */
export function addRandomTile(
  board: Board,
  random: () => number = Math.random,
): Board {
  const empty = getEmptyCells(board)
  if (empty.length === 0) return board

  const rng = random()
  const idx = Math.floor(rng * empty.length)
  const valueRng = random()
  const value = valueRng < 0.9 ? 2 : 4

  const newBoard = cloneBoard(board)
  newBoard[empty[idx].row][empty[idx].col] = value
  return newBoard
}

/** Create a fresh board with two random tiles. */
export function createInitialBoard(random: () => number = Math.random): Board {
  let board = createEmptyBoard(4)
  board = addRandomTile(board, random)
  board = addRandomTile(board, random)
  return board
}

// ── Win / Game Over ──

export function has2048(board: Board): boolean {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] >= 2048) return true
    }
  }
  return false
}

export function canMove(board: Board): boolean {
  const size = board.length
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // Empty cell → can move
      if (board[r][c] === 0) return true
      // Check right neighbor
      if (c + 1 < size && board[r][c] === board[r][c + 1]) return true
      // Check down neighbor
      if (r + 1 < size && board[r][c] === board[r + 1][c]) return true
    }
  }
  return false
}

export function isGameOver(board: Board): boolean {
  return !canMove(board)
}

// ── Game state helpers ──

export function createNewGameState(bestScore = 0): GameState {
  return {
    board: createInitialBoard(),
    score: 0,
    bestScore,
    status: 'playing',
    hasWon: false,
    keepPlayingAfterWin: false,
    history: [],
  }
}

const MAX_HISTORY = 50

export function applyMove(
  state: GameState,
  direction: Direction,
): GameState | null {
  if (state.status === 'game-over') return null
  // If won but haven't chosen to keep playing, block moves
  if (state.hasWon && !state.keepPlayingAfterWin) return null

  const { board, scoreGained, moved } = moveBoard(state.board, direction)
  if (!moved) return null

  // Save snapshot before applying changes
  const snapshot: GameSnapshot = {
    board: cloneBoard(state.board),
    score: state.score,
    hasWon: state.hasWon,
    keepPlayingAfterWin: state.keepPlayingAfterWin,
  }

  const history = [...state.history, snapshot].slice(-MAX_HISTORY)

  const newBoard = addRandomTile(board)
  const newScore = state.score + scoreGained
  const newBestScore = Math.max(state.bestScore, newScore)

  // Determine win/loss
  const justWon = !state.hasWon && has2048(newBoard)
  const gameOver = isGameOver(newBoard)

  let newStatus: GameStatus = 'playing'
  if (gameOver) {
    newStatus = 'game-over'
  } else if (justWon) {
    newStatus = 'won'
  }

  return {
    board: newBoard,
    score: newScore,
    bestScore: newBestScore,
    status: newStatus,
    hasWon: justWon || state.hasWon,
    keepPlayingAfterWin: state.keepPlayingAfterWin,
    history,
  }
}

export function undoMove(state: GameState): GameState | null {
  if (state.history.length === 0) return null

  const history = [...state.history]
  const snapshot = history.pop()
  if (!snapshot) return null

  return {
    board: snapshot.board,
    score: snapshot.score,
    bestScore: state.bestScore, // Keep best score
    status: 'playing',
    hasWon: snapshot.hasWon,
    keepPlayingAfterWin: snapshot.keepPlayingAfterWin,
    history,
  }
}

export function continueAfterWin(state: GameState): GameState | null {
  if (!state.hasWon || state.keepPlayingAfterWin) return null
  return {
    ...state,
    status: 'playing',
    keepPlayingAfterWin: true,
  }
}

// ── Tile-view animation helpers ──

export interface TileView {
  id: number
  value: number
  row: number
  col: number
}

export interface MoveAnimationInfo {
  tiles: TileView[]
  mergedIds: Set<number>
  newIds: Set<number>
  scoreGained: number
}

/**
 * Compute the next set of TileViews after a move, with animation metadata.
 *
 * @param oldTiles - tiles before the move
 * @param boardAfterMove - board after moving but BEFORE adding a random tile
 * @param boardAfterSpawn - board after adding the random tile
 * @param direction - the direction of movement
 * @param nextId - next available tile ID
 * @param scoreGained - score gained from this move (for sizing; not used for logic)
 * @returns animation info with new tile list, merged/new IDs, and score
 */
export function computeTileViews(
  oldTiles: TileView[],
  boardAfterMove: Board,
  boardAfterSpawn: Board,
  direction: Direction,
  nextId: number,
  scoreGained: number,
): { info: MoveAnimationInfo; nextId: number } {
  const size = boardAfterMove.length

  // Organize old tiles by row/col for efficient lookup
  const tileByPos = new Map<string, TileView>()
  for (const t of oldTiles) {
    tileByPos.set(`${t.row},${t.col}`, t)
  }

  // Track which old tiles have been matched
  const usedTileIds = new Set<number>()

  const resultTiles: TileView[] = []
  const mergedIds = new Set<number>()
  const newIds = new Set<number>()
  let currentId = nextId

  // Scan order depends on direction to match compression direction
  const rowOrder =
    direction === 'down'
      ? Array.from({ length: size }, (_, i) => size - 1 - i)
      : Array.from({ length: size }, (_, i) => i)

  const colOrder =
    direction === 'right'
      ? Array.from({ length: size }, (_, i) => size - 1 - i)
      : Array.from({ length: size }, (_, i) => i)

  // Get old tiles in the scan order for matching
  function getOldTilesInOrder(
    rowOrders: number[],
    colOrders: number[],
    direction: Direction,
  ): TileView[] {
    if (direction === 'left' || direction === 'right') {
      // Row by row
      const result: TileView[] = []
      for (const r of rowOrders) {
        const rowTiles: TileView[] = []
        for (const c of colOrders) {
          const t = tileByPos.get(`${r},${c}`)
          if (t && !usedTileIds.has(t.id)) {
            rowTiles.push(t)
          }
        }
        // For left, old tiles at lower cols are first; for right, higher cols first
        if (direction === 'right') {
          rowTiles.reverse()
        }
        result.push(...rowTiles)
      }
      return result
    } else {
      // Column by column
      const result: TileView[] = []
      for (const c of colOrders) {
        const colTiles: TileView[] = []
        for (const r of rowOrders) {
          const t = tileByPos.get(`${r},${c}`)
          if (t && !usedTileIds.has(t.id)) {
            colTiles.push(t)
          }
        }
        if (direction === 'down') {
          colTiles.reverse()
        }
        result.push(...colTiles)
      }
      return result
    }
  }

  const orderedOldTiles = getOldTilesInOrder(rowOrder, colOrder, direction)
  let oldIdx = 0

  // Iterate over non-zero cells in the destination board (after move, before spawn)
  // in the scan order that matches the compression direction
  type CellInfo = { row: number; col: number; val: number }
  const destCells: CellInfo[] = []

  const isHorizontal = direction === 'left' || direction === 'right'
  if (isHorizontal) {
    for (const r of rowOrder) {
      const cols = direction === 'right' ? [...colOrder].reverse() : colOrder
      for (const c of cols) {
        if (boardAfterMove[r][c] !== 0) {
          destCells.push({ row: r, col: c, val: boardAfterMove[r][c] })
        }
      }
    }
  } else {
    for (const c of colOrder) {
      const rows = direction === 'down' ? [...rowOrder].reverse() : rowOrder
      for (const r of rows) {
        if (boardAfterMove[r][c] !== 0) {
          destCells.push({ row: r, col: c, val: boardAfterMove[r][c] })
        }
      }
    }
  }

  for (const dest of destCells) {
    if (oldIdx >= orderedOldTiles.length) {
      // No more old tiles to match — this shouldn't normally happen
      // (can happen if there's a bug, or if tiles appear out of nowhere)
      const tile: TileView = {
        id: currentId++,
        value: dest.val,
        row: dest.row,
        col: dest.col,
      }
      resultTiles.push(tile)
      newIds.add(tile.id)
      continue
    }

    const oldTile = orderedOldTiles[oldIdx]

    if (oldTile.value === dest.val) {
      // Simple move: old tile moved to new position
      resultTiles.push({
        id: oldTile.id,
        value: dest.val,
        row: dest.row,
        col: dest.col,
      })
      usedTileIds.add(oldTile.id)
      oldIdx++
    } else if (
      oldIdx + 1 < orderedOldTiles.length &&
      oldTile.value + orderedOldTiles[oldIdx + 1].value === dest.val
    ) {
      // Merge: two old tiles combined
      const second = orderedOldTiles[oldIdx + 1]
      const mergedTile: TileView = {
        id: currentId++,
        value: dest.val,
        row: dest.row,
        col: dest.col,
      }
      resultTiles.push(mergedTile)
      mergedIds.add(mergedTile.id)
      usedTileIds.add(oldTile.id)
      usedTileIds.add(second.id)
      oldIdx += 2
    } else {
      // Value mismatch — could be a merge with non-adjacent old tiles
      // Find two tiles that sum to this value (greedy scan forward)
      let found = false
      for (let i = oldIdx; i + 1 < orderedOldTiles.length; i++) {
        const a = orderedOldTiles[i]
        for (let j = i + 1; j < orderedOldTiles.length; j++) {
          const b = orderedOldTiles[j]
          if (
            a.value + b.value === dest.val &&
            !usedTileIds.has(a.id) &&
            !usedTileIds.has(b.id)
          ) {
            const mergedTile: TileView = {
              id: currentId++,
              value: dest.val,
              row: dest.row,
              col: dest.col,
            }
            resultTiles.push(mergedTile)
            mergedIds.add(mergedTile.id)
            usedTileIds.add(a.id)
            usedTileIds.add(b.id)
            found = true
            break
          }
        }
        if (found) break
      }

      if (!found) {
        // Fallback: treat as moved tile
        resultTiles.push({
          id: oldTile.id,
          value: dest.val,
          row: dest.row,
          col: dest.col,
        })
        usedTileIds.add(oldTile.id)
        oldIdx++
      } else {
        // Skip used tiles in the index
        while (
          oldIdx < orderedOldTiles.length &&
          usedTileIds.has(orderedOldTiles[oldIdx].id)
        ) {
          oldIdx++
        }
      }
    }
  }

  // Now find the new random tile: compare boardAfterSpawn vs boardAfterMove
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (boardAfterSpawn[r][c] !== 0 && boardAfterMove[r][c] === 0) {
        // This is the newly spawned tile
        const newTile: TileView = {
          id: currentId++,
          value: boardAfterSpawn[r][c],
          row: r,
          col: c,
        }
        resultTiles.push(newTile)
        newIds.add(newTile.id)
      }
    }
  }

  return {
    info: {
      tiles: resultTiles,
      mergedIds,
      newIds,
      scoreGained,
    },
    nextId: currentId,
  }
}
