import { getQuestionByID, _saveQuestion, _saveQuestionAnswer } from "./Data";

jest.setTimeout(10000);
describe('getQuestionByID', () => {
    it('getQuestionByID: will return question if successful', async() => {
         
        let result = await getQuestionByID('6ni6ok3ym7mf1p33lnez');
        expect(result.author).toEqual('mtsamis');
    });
 
});

describe('_saveQuestion', () => {
    it('_saveQuestion: will return the question is successful', async() => {
        let question = {
            author: "tylerseguin",
            optionOneText: 'Test option 1',
            optionTwoText: 'Test option 2',
        };
        let result = await _saveQuestion(question);
        //all fields are being populated
        expect(result.author).toEqual('tylerseguin');
        expect(result.optionOne.text).toEqual('Test option 1');
        expect(result.optionTwo.text).toEqual('Test option 2');
    });

    it('_saveQuestion: will errors out if only one answer is entered', async() => {
        let question = {
            author: "tylerseguin",
            optionTwoText: 'Test option 2',
        };
        await expect(_saveQuestion(question)).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
    });
});


describe('_saveQuestionAnswer', () => {
    it('_saveQuestionAnswer: will return true if successful', async() => {
        let object = {
            ans: "optionOne",
            authedUser: "mtsamis",
            qid: "xj352vofupe1dqz9emx13r",
        }
        let result = await _saveQuestionAnswer(object);
        expect(result).toEqual(true);
    });

    it('will return an error if unsuccessful', async() => {
        let object = {
            answer: "optionOne",
            qid: "xj352vofupe1dqz9emx13r",
        }
        await expect( _saveQuestionAnswer(object)).rejects.toEqual("Please provide authedUser, qid, and answer");
    });
});


