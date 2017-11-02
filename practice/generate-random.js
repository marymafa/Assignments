function combinations(word) {
for (var i = 0; i < word.length; i++) {
var comb = "";
for (var b = i; b < word.length; b++) {
comb=comb+word[b];
console.log(comb);
};
};
}
console.log(combinations("sabelo"));