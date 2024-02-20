function knightMoves(start, goal) {
  const legalMoves = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  function print(path) {
    let moves = () => (path.length === 2 ? 'move' : 'moves');
    console.log(
      `You made it in ${path.length - 1} ${moves()}! Here's your path:`
    );
    for (let i = 0; i < path.length; i++) {
      console.log(path[i]);
    }
  }

  function isValid(path) {
    if (path[0] < 0 || path[1] < 0 || path[0] > 7 || path[1] > 7) {
      return false;
    } else return true;
  }
  if (!isValid(start) || !isValid(goal)) return console.log('Invalid input');

  if (start[0] === goal[0] && start[1] === goal[1]) {
    return start;
  }
  let queue = [];
  queue.push([start]);

  let board = new Array(8).fill(false).map(() => new Array(8).fill(false));
  board[start[0]][start[1]] = true;

  function isVisited(cell) {
    if (board[cell[0]][cell[1]]) {
      return true;
    } else return false;
  }
  while (queue.length > 0) {
    let path = queue.shift();
    let current = path[path.length - 1];
    for (let i = 0; i < legalMoves.length; i++) {
      let next = [current[0] + legalMoves[i][0], current[1] + legalMoves[i][1]];
      if (isValid(next) && !isVisited(next)) {
        board[next[0]][next[1]] = true;
        let fullPath = [...path, next];
        queue.push(fullPath);
        if (next[0] === goal[0] && next[1] === goal[1]) {
          print(fullPath);
          return fullPath;
        }
      }
    }
  }
  return [];
}

knightMoves([0, 8], [7, 7]);
// output 'Invalid input'

knightMoves([0, 0], [1, 2]);
// output [[0,0],[1,2]]

knightMoves([0, 0], [3, 3]);
// output [[0,0],[2,1],[3,3]] or [[0,0],[1,2],[3,3]]

knightMoves([3, 3], [0, 0]);
// output [[3,3],[2,1],[0,0]] or [[3,3],[1,2],[0,0]]

knightMoves([3, 3], [4, 3]);
// output [[ 3, 3 ],[ 5, 4 ],[ 3, 5 ],[ 4, 3 ]]

knightMoves([0, 0], [7, 7]);
// output [[0,0],[2,1],[4,2],[6,3],[4,4],[6,5],[7,7]]
// or     [[0,0],[2,1],[4,2],[6,3],[7,5],[5,6],[7,7]]
