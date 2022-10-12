module.exports = {
    format_time: (date) => {
      return date.toLocaleString();
    },
    complexIf: (cond1, cond2) => {
        console.log(`complexIf 1: ${cond1}`);
        console.log(`complexIf 2: ${cond2}`);

        if (cond1 === cond2){
            return true;
        }
    }
  };