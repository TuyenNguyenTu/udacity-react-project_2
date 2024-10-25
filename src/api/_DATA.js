let users = {
    tuyennt30: {
      id: 'tuyennt30',
      password:'123456',
      name: 'Tuyen Nguyen Tu',
      avatarURL: "https://i.pravatar.cc/300?u=tuyennt30",
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
      avatarURL: "https://i.pravatar.cc/300?u=tylermcginnis",
      answers: {
        "vxhrdm985a262al8qx3dz": 'optionOne',
        "xj352vofupe1dqz9xyz23r": 'optionTwo',
      },
      questions: ['loxhs1bqm25b708cmbf3g', 'vxhrdm985a262al8qx3dz'],
    },
    leonel: {
      id: 'leonel',
      password:'xyz123',
      name: 'Mike Tsamis',
      avatarURL: "https://wordpresscdn.winzogames.com/prod/blog/wp-content/uploads/2023/07/31052605/tbS38oF4.webp",
      answers: {
        "xj352vofupe1dqz9xyz23r": 'optionOne',
        "vxhrdm985a262al8qx3dz": 'optionTwo',
        "6ni6ok3ym7mf1p33lnez": 'optionOne'
      },
      questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9xyz23r'],
    },
    yasuo: {
      id: 'yasuo',
      password:'pass246',
      name: 'Zenobia Oshikanlu',
      avatarURL: "https://assets.allcode.com/wp-content/uploads/2021/07/top-aws-service-list-2023-scaled.webp",
      answers: {
        "xj352vofupe1dqz9xyz23r": 'optionOne',
      },
      questions: [],
    }
  }
  
  let questions = {
    "8xf0y6ziyjabvozdd253nd": {
      id: '8xf0y6ziyjabvozdd253nd',
      author: 'tuyennt30',
      timestamp: 1467166872634,
      optionOne: {
        votes: ['tuyennt30'],
        text: 'Build our new application with Javascript',
      },
      optionTwo: {
        votes: [],
        text: 'Build our new application with Typescript'
      }
    },
    "6ni6ok3ym7mf1p33lnez": {
      id: '6ni6ok3ym7mf1p33lnez',
      author: 'leonel',
      timestamp: 1468479767190,
      optionOne: {
        votes: [],
        text: 'hire more frontend developers',
      },
      optionTwo: {
        votes: ['leonel', 'tuyennt30'],
        text: 'hire more backend developers'
      }
    },
    "am8ehyc8byjqgar0jgpub9": {
      id: 'am8ehyc8byjqgar0jgpub9',
      author: 'tuyennt30',
      timestamp: 1488579767190,
      optionOne: {
        votes: [],
        text: 'conduct a release retrospective 1 week after a release',
      },
      optionTwo: {
        votes: ['tuyennt30'],
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
        votes: ['tuyennt30'],
        text: 'have code reviews conducted by managers'
      }
    },
    "vxhrdm985a262al8qx3dz": {
      id: 'vxhrdm985a262al8qx3dz',
      author: 'tylermcginnis',
      timestamp: 1489579767190,
      optionOne: {
        votes: ['tylermcginnis'],
        text: 'take a course on FullStack',
      },
      optionTwo: {
        votes: ['leonel'],
        text: 'take a course on unit testing with Jest'
      }
    },
    "xj352vofupe1dqz9xyz23r": {
      id: 'xj352vofupe1dqz9xyz23r',
      author: 'leonel',
      timestamp: 1493579767190,
      optionOne: {
        votes: ['leonel', 'yasuo'],
        text: 'Lionel Messi will coach you in football',
      },
      optionTwo: {
        votes: ['tylermcginnis'],
        text: 'Cristiano Ronaldo will coach you in football'
      }
    },
  }
  
  function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
  
  export function _getUsers () {
    return new Promise((resolve) => {
      setTimeout(() => resolve({...users}), 1000)
    })
  }
  
  export function _getQuestions () {
    return new Promise((resolve) => {
      setTimeout(() => resolve({...questions}), 1000)
    })
  }
  
  export function formatQuestion ({ optionOneText, optionTwoText, author }) {
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
        users = {
          ...users,
          [formattedQuestion.author]: {
            ...users[formattedQuestion.author],
            questions: [...users[formattedQuestion.author].questions, formattedQuestion.id]
          }
        }
  
        resolve(formattedQuestion)
      }, 1000)
    })
  }
  
  export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
    return new Promise((resolve, reject) => {
      if (!authedUser || !qid || !answer) {
        reject("Please provide authedUser, qid, and answer");
      }
  
      setTimeout(() => {
        users = {
          ...users,
          [authedUser]: {
            ...users[authedUser],
            answers: {
              ...users[authedUser].answers,
              [qid]: answer
            }
          }
        }
  
        questions = {
          ...questions,
          [qid]: {
            ...questions[qid],
            [answer]: {
              ...questions[qid][answer],
              votes: questions[qid][answer].votes.concat([authedUser])
            }
          }
        }
  
        resolve(true)
      }, 500)
    })
  }