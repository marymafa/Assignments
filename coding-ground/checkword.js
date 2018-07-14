function checkWord( board, word ) {
  for(let i=0; i<board.length; i++)
    for(let j=0; j<board[i].length; j++)
      if (check(i, j, word)) return true;
  return false;
  
  function check(i, j, word) {
    if (!word) return true;
    if (i<0||j<0||i>=board.length||j>=board[i].length) return false;
    let s = board[i][j];
    if (s !== word[0]) return false;
    board[i][j] = '';
    for (let [a, b] of [[i+1, j],[i-1, j],[i, j+1],[i, j-1],[i+1, j+1],[i-1, j+1],[i+1, j-1],[i-1, j-1]]) {
      if (check(a, b, word.slice(1))) {
        board[i][j] = s;
        return true;
      }
    }
    board[i][j] = s;
    return false;
  }
}