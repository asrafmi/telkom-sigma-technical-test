import Event, { EventAttributes } from '../db/models/event.model';
import { ConflictError, ICustomError, MySqlError } from '../extends/error';

async function fetch() {
  try {
    const event = await Event.findAll({});
    return event;
  } catch (error) {
    const customError = error as ICustomError;
    throw new MySqlError(customError.message);
  }
}

async function create(body: Omit<EventAttributes, 'id'>) {
  try {
    const findEvent = await Event.findAll({
      where: {
        name: body.name,
      },
    });
    if (findEvent.length) {
      throw new ConflictError('Event already exists!');
    }
    const event = await Event.create(body);
    return event;
  } catch (error) {
    const customError = error as ICustomError;
    throw customError.status
      ? customError
      : new MySqlError(customError.message);
  }
}

async function update(id: number, body: Omit<EventAttributes, 'id'>) {
  try {
    const event = await Event.findByPk(id);
    if (!event) {
      throw new MySqlError('Event not found!');
    }
    const update = await event.update(body);
    return update;
  } catch (error) {
    const customError = error as ICustomError;
    throw customError.status
      ? customError
      : new MySqlError(customError.message);
  }
}

async function remove(id: number) {
  try {
    const event = await Event.findByPk(id);
    if (!event) {
      throw new MySqlError('Event not found!');
    }
    const remove = await event.destroy();
    return remove;
  } catch (error) {
    const customError = error as ICustomError;
    throw customError.status
      ? customError
      : new MySqlError(customError.message);
  }
}

export default { fetch, create, update, remove };
