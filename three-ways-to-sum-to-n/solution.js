var sum_to_n_a = function(n) {
  // simple loop
  let res = 0
  for(let i = 1; i <= n; i++) {
    res += i
  }

  return res

};

var sum_to_n_b = function(n) {
  // Formula: S = n*(n+1)/2
  return n*(n+1)/2
};

var sum_to_n_c = function(n) {
  // recursion: sum_to_n_c(n) = sum_to_n_c(n) = sum_to_n_c(n-1) + sum_to_n_c(n-2) +...+ sum_to_n_c(1)
  if(n === 1) return 1
  return n + sum_to_n_c(n - 1)
};

// testcase

// expected: 15
console.log({
  sum_to_n_a: sum_to_n_a(5),
  sum_to_n_b: sum_to_n_b(5),
  sum_to_n_c: sum_to_n_c(5)
})

// expected: 55
console.log({
  sum_to_n_a: sum_to_n_a(10),
  sum_to_n_b: sum_to_n_b(10),
  sum_to_n_c: sum_to_n_c(10)
})