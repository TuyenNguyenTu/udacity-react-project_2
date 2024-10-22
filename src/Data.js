let users = {
    sarahedo: {
      id: 'sarahedo',
      password:'password123',
      name: 'Sarah Edo',
      avatarURL: 'https://img.freepik.com/premium-vector/cute-smiling-boy-avatar-flat-style-vector-illustration_710508-1241.jpg',
      answers: {
        "8xf0y6ziyjabvozdd253nd": 'optionOne',
        "6ni6ok3ym7mf1p33lnez": 'optionOne',
        "am8ehyc8byjqgar0jgpub9": 'optionTwo',
        "loxhs1bqm25b708cmbf3g": 'optionTwo'
      },
      questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
    },
    tylermcginnis: {
      id: 'tylermcginnis',
      password:'abc321',
      name: 'Tyler McGinnis',
      avatarURL: 'https://static.vecteezy.com/system/resources/previews/005/026/528/non_2x/illustration-female-avatar-in-flat-style-free-vector.jpg',
      answers: {
        "vthrdm985a262al8qx3do": 'optionOne',
        "xj352vofupe1dqz9emx13r": 'optionTwo',
      },
      questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
    },
    mtsamis: {
      id: 'mtsamis',
      password:'xyz123',
      name: 'Mike Tsamis',
      avatarURL: 'https://cdni.iconscout.com/illustration/premium/thumb/business-woman-5373575-4498296.png',
      answers: {
        "xj352vofupe1dqz9emx13r": 'optionOne',
        "vthrdm985a262al8qx3do": 'optionTwo',
        "6ni6ok3ym7mf1p33lnez": 'optionOne'
      },
      questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
    },
    zoshikanlu: {
      id: 'zoshikanlu',
      password:'pass246',
      name: 'Zenobia Oshikanlu',
      avatarURL: 'https://i.pinimg.com/originals/49/3f/a0/493fa0f13970ab3ef29375669f670451.jpg',
      answers: {
        "xj352vofupe1dqz9emx13r": 'optionOne',
      },
      questions: [],
    }
  }
  
  let questions = {
    "8xf0y6ziyjabvozdd253nd": {
      id: '8xf0y6ziyjabvozdd253nd',
      author: 'sarahedo',
      timestamp: 1467166872634,
      optionOne: {
        votes: ['sarahedo'],
        text: 'Build our new application with Javascript',
      },
      optionTwo: {
        votes: [],
        text: 'Build our new application with Typescript'
      }
    },
    "6ni6ok3ym7mf1p33lnez": {
      id: '6ni6ok3ym7mf1p33lnez',
      author: 'mtsamis',
      timestamp: 1468479767190,
      optionOne: {
        votes: [],
        text: 'hire more frontend developers',
      },
      optionTwo: {
        votes: ['mtsamis', 'sarahedo'],
        text: 'hire more backend developers'
      }
    },
    "am8ehyc8byjqgar0jgpub9": {
      id: 'am8ehyc8byjqgar0jgpub9',
      author: 'sarahedo',
      timestamp: 1488579767190,
      optionOne: {
        votes: [],
        text: 'conduct a release retrospective 1 week after a release',
      },
      optionTwo: {
        votes: ['sarahedo'],
        text: 'conduct release retrospectives quarterly'
      }
    },
    "loxhs1bqm25b708cmbf3g": {
      id: 'loxhs1bqm25b708cmbf3g',
      author: 'tylermcginnis',
      timestamp: 1482579767190,
      optionOne: {
        votes: [],
        text: 'have code reviews conducted by peers',
      },
      optionTwo: {
        votes: ['sarahedo'],
        text: 'have code reviews conducted by managers'
      }
    },
    "vthrdm985a262al8qx3do": {
      id: 'vthrdm985a262al8qx3do',
      author: 'tylermcginnis',
      timestamp: 1489579767190,
      optionOne: {
        votes: ['tylermcginnis'],
        text: 'take a course on ReactJS',
      },
      optionTwo: {
        votes: ['mtsamis'],
        text: 'take a course on unit testing with Jest'
      }
    },
    "xj352vofupe1dqz9emx13r": {
      id: 'xj352vofupe1dqz9emx13r',
      author: 'mtsamis',
      timestamp: 1493579767190,
      optionOne: {
        votes: ['mtsamis', 'zoshikanlu'],
        text: 'deploy to production once every two weeks',
      },
      optionTwo: {
        votes: ['tylermcginnis'],
        text: 'deploy to production once every month'
      }
    },
  }
  
  function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
  
  export function getUsers () {
    return new Promise((resolve) => {
      setTimeout(() => resolve({...users}), 1000)
    })
  }
  
  export function getQuestions () {
    return new Promise((resolve) => {
      setTimeout(() => resolve({...questions}), 1000)
    })
  }

  export function getQuestionByID (id) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({...questions[id]}), 500)
    })
  }
  
  function formatQuestion ({ optionOneText, optionTwoText, author }) {
    return {
      id: generateUID(),
      timestamp: Date.now(),
      author,
      optionOne: {
        votes: [],
        text: optionOneText,
      },
      optionTwo: {
        votes: [],
        text: optionTwoText,
      }
    }
  }
  
  export function _saveQuestion (question) {
    return new Promise((resolve, reject) => {
      if (!question.optionOneText || !question.optionTwoText || !question.author) {
        reject("Please provide optionOneText, optionTwoText, and author");
      }
  
      const formattedQuestion = formatQuestion(question)
      setTimeout(() => {
        questions = {
          ...questions,
          [formattedQuestion.id]: formattedQuestion
        }
  
        resolve(formattedQuestion)
      }, 1000)
    })
  }
  
  export function _saveQuestionAnswer ({ authedUser, qid, ans }) {
    return new Promise((resolve, reject) => {
      if (!authedUser || !qid || !ans) {
        reject("Please provide authedUser, qid, and answer");
      }  
      setTimeout(() => {
        users = {
          ...users,
          [authedUser]: {
            ...users[authedUser],
            ans: {
              ...users[authedUser].answers,
              [qid]: ans
            }
          }
        }  
        questions = {
          ...questions,
          [qid]: {
            ...questions[qid],
            [ans]: {
              ...questions[qid][ans],
              votes: questions[qid][ans].votes.concat([authedUser])
            }
          }
        }  
        resolve(true)
      }, 500)
    })
  }
  export function login(username, password) {
    return new Promise((resolve, reject) =>
        setTimeout(() => {
            if (Object.keys(users).includes(username)) {
                const user = users[username];
                if (user.password !== password) {
                    reject('Password is invalid.');
                }
                return resolve({data: user});
            }
            return reject('User not found.');
        }, 500)
    );
}