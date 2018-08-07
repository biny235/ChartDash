const analyser = data => {
  const analysis = data.results.reduce(
    (memo, user) => {

      memo.total++;
      memo[user.gender]++;
      
      if (checkName(user.name.first)) {
        memo.firstNZ++;
      } else {
        memo.firstAM++;
      }
      if (checkName(user.name.last)) {
        memo.lastNZ++;
      } else {
        memo.lastAM++;
      }
      if (!memo.states[user.location.state]) memo.states[user.location.state] = { male: 0, female: 0 };
      memo.states[user.location.state][user.gender]++;
      const { age } = user.dob;
      memo.ages = agesSplit(memo.ages, age);
      return memo;
    },
    {
      total: 0,
      firstAM: 0,
      firstNZ: 0,
      lastAM: 0,
      lastNZ: 0,
      male: 0,
      female: 0,
      states: {},
      ages: {
        '0-20': 0,
        '21-40': 0,
        '41-60': 0,
        '61-80': 0,
        '81-100': 0,
        'over100': 0
      }
    }
  );
  analysis.mostPopulusStatesFemale = mostPopulusStatesFemale(analysis);
  analysis.mostPopulusStatesMale = mostPopulusStatesMale(analysis);
  analysis.mostPopulusStates = mostPopulusStates(analysis);
  analysis.ages = ageBreakdown(analysis);
  delete analysis.states
  
  return analysis;
};

const checkName = (name)=>{
  if (name[0].toUpperCase() > 'M') return true
}

const agesSplit = (currentAges, age) => {
  if (age >= 100) {
    currentAges['over100']++;
  } else if (age >= 81) {
    currentAges['81-100']++;
  } else if (age >= 61) {
    currentAges['61-80']++;
  } else if (age >= 41) {
    currentAges['41-60']++;
  } else if (age >= 21) {
    currentAges['21-40']++;
  } else {
    currentAges['0-20']++;
  }
  return currentAges
}


const mostPopulusStates = (data) => {
  let {states} = data;
  let sortable = [];
  Object.keys(states).forEach(state =>
    sortable.push([state, states[state].male + states[state].female])
  );
  return sortable.sort((a, b) => b[1] - a[1]).slice(0, 10);
}
const mostPopulusStatesMale = (data) => {
  let { states } = data;
  let sortable = [];
  Object.keys(states).forEach(state =>
    sortable.push([state, states[state].male])
  );
  return sortable.sort((a, b) => b[1] - a[1]).slice(0, 10);
}
const mostPopulusStatesFemale = (data)=> {
  let { states } = data;
  let sortable = [];
  Object.keys(states).forEach(state =>
    sortable.push([state, states[state].female])
  );
  return sortable.sort((a, b) => b[1] - a[1]).slice(0, 10);
}

const ageBreakdown = (data) => {
  let { ages } = data;
  let arr = [];
  Object.keys(ages).forEach(range => arr.push([range, ages[range]]));
  return arr;
}

module.exports = analyser;

// 1. Percentage female versus male
// 2. Percentage of first names that start with A‐M versus N‐Z
// 3. Percentage of last names that start with A‐M versus N‐Z
// 4. Percentage of people in each state, up to the top 10 most populous states
// 5. Percentage of females in each state, up to the top 10 most populous states
// 6. Percentage of males in each state, up to the top 10 most populous states
// 7. Percentage of people in the following age ranges: 0‐20, 21‐40, 41‐60, 61‐80, 81‐100,
// 100+