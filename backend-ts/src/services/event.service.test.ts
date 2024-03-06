import Event from '../db/models/event.model';
import { ConflictError, MySqlError } from '../extends/error';
import EventSvc from './event.service';

jest.mock('../db/models/event.model');

describe('create', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new event', async () => {
    const newEvent = {
      name: 'New Event',
      date: '2022-01-01',
      location: 'Some Location',
    };
    Event.findAll.mockResolvedValue([]);
    Event.create.mockResolvedValue(newEvent);

    const result = await EventSvc.create(newEvent);

    expect(Event.findAll).toHaveBeenCalledWith({
      where: {
        name: newEvent.name,
      },
    });
    expect(Event.create).toHaveBeenCalledWith(newEvent);
    expect(result).toEqual(newEvent);
  });

  it('should throw ConflictError if event already exists', async () => {
    const existingEvent = [
      {
        id: 1,
        name: 'Existing Event',
        date: '2022-01-01',
        location: 'Some Location',
      },
    ];
    Event.findAll.mockResolvedValue(existingEvent);

    await expect(
      EventSvc.create({
        name: 'Existing Event',
        date: '2022-01-01',
        location: 'Some Location',
      })
    ).rejects.toThrow(ConflictError);
  });

  it('should throw MySqlError if database query fails', async () => {
    const mockError = new Error('Database query failed');
    Event.findAll.mockRejectedValue(mockError);

    await expect(
      EventSvc.create({
        name: 'New Event',
        date: '2022-01-01',
        location: 'Some Location',
      })
    ).rejects.toThrow(MySqlError);
  });
});

describe('fetch', () => {
  it('should fetch all events', async () => {
    const mockEvents = [
      { id: 1, name: 'Event 1', date: '2022-01-01', location: 'Location 1' },
      { id: 2, name: 'Event 2', date: '2022-02-01', location: 'Location 2' },
    ];
    Event.findAll.mockResolvedValue(mockEvents);

    const result = await EventSvc.fetch();

    expect(Event.findAll).toHaveBeenCalledWith({});
    expect(result).toEqual(mockEvents);
  });

  it('should throw MySqlError if database query fails', async () => {
    const mockError = new Error('Database query failed');
    Event.findAll.mockRejectedValue(mockError);

    await expect(EventSvc.fetch()).rejects.toThrow(MySqlError);
  });
});

describe('update', () => {
  it('should update an existing event', async () => {
    const existingEvent = {
      id: 1,
      name: 'Existing Event',
      date: '2022-01-01',
      location: 'Location',
    };
    Event.findOne.mockResolvedValue(existingEvent);
    const updatedData = {
      name: 'Updated Event',
      date: '2022-01-02',
      location: 'New Location',
    };
    Event.update.mockResolvedValue(updatedData);

    const result = await EventSvc.update(1, updatedData);

    expect(Event.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(Event.update).toHaveBeenCalledWith(updatedData, {
      where: { id: 1 },
    });
    expect(result).toEqual(updatedData);
  });

  it('should throw MySqlError if event is not found', async () => {
    Event.findOne.mockResolvedValue(null);

    await expect(
      EventSvc.update(999, {
        name: 'Updated Event',
        date: '2022-01-02',
        location: 'New Location',
      })
    ).rejects.toThrow(MySqlError);
  });

  it('should throw MySqlError if database query fails', async () => {
    const mockError = new Error('Database query failed');
    Event.findOne.mockRejectedValue(mockError);

    await expect(
      EventSvc.update(1, {
        name: 'Updated Event',
        date: '2022-01-02',
        location: 'New Location',
      })
    ).rejects.toThrow(MySqlError);
  });
});

describe('remove', () => {
  it('should remove an existing event', async () => {
    const existingEvent = {
      id: 1,
      name: 'Existing Event',
      date: '2022-01-01',
      location: 'Location',
    };
    Event.findOne.mockResolvedValue(existingEvent);
    const destroyResult = { success: true };
    Event.destroy.mockResolvedValue(destroyResult);

    const result = await EventSvc.remove(1);

    expect(Event.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(Event.destroy).toHaveBeenCalled();
    expect(result).toEqual(destroyResult);
  });

  it('should throw MySqlError if event is not found', async () => {
    Event.findOne.mockResolvedValue(null);

    await expect(EventSvc.remove(999)).rejects.toThrow(MySqlError);
  });

  it('should throw MySqlError if database query fails', async () => {
    const mockError = new Error('Database query failed');
    Event.findOne.mockRejectedValue(mockError);

    await expect(EventSvc.remove(1)).rejects.toThrow(MySqlError);
  });
});