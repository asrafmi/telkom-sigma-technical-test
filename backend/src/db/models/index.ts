import User from './user.model';
import Event from './event.model';

function associateModels() {
  User.associate({ Event });
  Event.associate({ User });
}

associateModels();

export { User, Event };
