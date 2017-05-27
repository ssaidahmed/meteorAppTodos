import { Meteor } from 'meteor/meteor';
import {Random} from 'meteor/random'; 
import {Tasks} from './tasks.js';
import { assert } from 'meteor/practicalmeteor:chai';
if (Meteor.isServer) {
  describe('Tasks', () => {
    describe('methods', () => {
        const userId = Random.id();
        let taskId;
        beforeEach(()=>{
            Tasks.remove({});
            taskId = Tasks.insert({
                text:'test task',
                createAt:new Date(),
                owner:userId,
                username:'tmeasday'
            });
        });

      it('can delete owned task', () => {
          const deleteT = Meteor.server.method_handlers['tasks.remove'];
          const invocation = {
              userId
          };

          deleteT.apply(invocation, [taskId]);

          assert.equal(Tasks.find().count(),0);
      });
    });
  });
}