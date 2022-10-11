module.exports = {
    format_time: (date) => {
      return date.toLocaleString();
    },
    complexIf: (cond1, cond2) => {
        console.log(cond1);
        console.log(cond2);

        if (cond1 == cond2){
            return true;
        }
    }
  };