1;
function J , len = computeCost(X, Y, theta)
len = length(Y);
J = ( 1 / ( 2 * len ) ) * sum( ( ( X * theta ) - Y ) ^ 2 )
endfunction

computeCost(
            [1 2
             3 4],
                  [2 4
                   6 8]
                       ,5 );