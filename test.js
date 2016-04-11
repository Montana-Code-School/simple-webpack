var nums =[{name: 1, val: 1},
{name: 2, val: 1},
{name: 3, val: 2},
{name: 4, val: 2}];


Array.prototype.unique = function() {
    return this.reduce(function(accum, current) {
        if (accum.indexOf(current) < 0) {
            accum.push(current);
        }
        return accum;
    }, []);
}

var newArr = [];

for (var i = 0; i < nums.length; i++) {
  newArr.push(nums[i].val);
};

console.log(newArr.unique());