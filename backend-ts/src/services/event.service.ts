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
    const event = await Event.findOne({ where: { id } });
    if (!event) {
      throw new MySqlError('Event not found!');
    }
    const update = await Event.update(body, { where: { id } });
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
    const event = await Event.findOne({ where: { id } });
    if (!event) {
      throw new MySqlError('Event not found!');
    }
    const remove = await Event.destroy({ where: { id } });
    return remove;
  } catch (error) {
    const customError = error as ICustomError;
    throw customError.status
      ? customError
      : new MySqlError(customError.message);
  }
}

async function createEventWithUser(event_id: number, user_id: number) {
  try {
    const event = await Event.update({ user_id }, { where: { id: event_id } });
    return event;
  } catch (error) {
    const customError = error as ICustomError;
    throw customError.status
      ? customError
      : new MySqlError(customError.message);
  }
}

export default { fetch, create, update, remove, createEventWithUser };
