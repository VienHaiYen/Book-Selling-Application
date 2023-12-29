const ValidateModel = {
  areAllStringsNotEmpty: function ([...obj]) {
    // console.log(123, obj);
    for (let item of obj) {
      if (item === "") {
        return false;
      }
    }
    return true;
  },
  isValidateEmail: function (email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  },
  isMoreThanNChars: function (str, n = 3) {
    return str.length > n;
  },
};

export { ValidateModel };
