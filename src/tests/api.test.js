var {_saveQuestion, _saveQuestionAnswer} = require('../api/_DATA')


describe('_saveQuestion', () => {
    test('Success save data', async() => {
        var result = await _saveQuestion({author: 'tuyennt30',optionOneText: 'opt1', optionTwoText: 'opt2' });
        expect(result.author).toEqual('tuyennt30');
        expect(result.optionOne.text).toEqual('opt1');
        expect(result.optionTwo.text).toEqual('opt2');
    });

    test('Fail to save data', async() => {
        await expect(_saveQuestion({author: 'tuyennt30', optionTwoText: 'opt2' })).rejects.toEqual('Please provide optionOneText, optionTwoText, and author')
    });
})

describe('_saveQuestionAnswer', () => {
    test('Success save data', async() => {
        var result = await _saveQuestionAnswer({authedUser: 'leonel', qid: "xj352vofupe1dqz9xyz23r", answer: "optionTwo" });
        expect(result).toEqual(true);
    });

    test('Fail to save data', async() => {
        await expect(_saveQuestionAnswer({authedUser: 'leonel', qid: "xj352vofupe1dqz9xyz23r" })).rejects.toEqual('Please provide authedUser, qid, and answer')
    });
})