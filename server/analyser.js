const analyser = data => {
  const analysis = data.results.reduce(
    (memo, user) => {
      memo[user.gender]++;
      memo.total++;
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

// 1. Percentage female versus male -
// 2. Percentage of first names that start with A‐M versus N‐Z-
// 3. Percentage of last names that start with A‐M versus N‐Z-
// 4. Percentage of people in each state, up to the top 10 most populous states
// 5. Percentage of females in each state, up to the top 10 most populous states
// 6. Percentage of males in each state, up to the top 10 most populous states
// 7. Percentage of people in the following age ranges: 0‐20, 21‐40, 41‐60, 61‐80, 81‐100,
// 100+

// {
//   "gender": "female",
//   "name": {
//   "title": "mrs",
//   "first": "lucy",
//   "last": "brooks"
//   },
//   "location": {
//   "street": "7368 park lane",
//   "city": "roscrea",
//   "state": "clare",
//   "postcode": 85992,
//   "coordinates": {
//   "latitude": "22.2296",
//   "longitude": "61.0530"
//   },
//   "timezone": {
//   "offset": "+6:00",
//   "description": "Almaty, Dhaka, Colombo"
//   }
//   },
//   "email": "lucy.brooks@example.com",
//   "login": {
//   "uuid": "a18cb9c1-dbb1-4744-9ace-607041280599",
//   "username": "tinykoala114",
//   "password": "shonuf",
//   "salt": "TQeCrqwO",
//   "md5": "e812213c90dea9dfb315d594d63c4e99",
//   "sha1": "f4c1ef7f1a2d710fba8d7eb56a1c4304f5cb29db",
//   "sha256": "1ddd4b97e1db9ffaba7654c87edecad224f6329e6352293d5a6cf076a2aa861f"
//   },
//   "dob": {
//   "date": "1970-03-24T14:42:40Z",
//   "age": 48
//   },
//   "registered": {
//   "date": "2002-08-15T23:33:46Z",
//   "age": 15
//   },
//   "phone": "011-150-3553",
//   "cell": "081-488-1383",
//   "id": {
//   "name": "PPS",
//   "value": "6815436T"
//   },
//   "picture": {
//   "large": "https://randomuser.me/api/portraits/women/25.jpg",
//   "medium": "https://randomuser.me/api/portraits/med/women/25.jpg",
//   "thumbnail": "https://randomuser.me/api/portraits/thumb/women/25.jpg"
//   },
//   "nat": "IE"
//   },
