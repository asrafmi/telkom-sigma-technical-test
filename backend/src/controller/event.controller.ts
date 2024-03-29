import { Request, Response } from 'express';
import EventSvc from '../services/event.service';
import ResponseUtils from '../utils/response';
import AuthUtils from '../utils/auth';
import { ICustomError } from '../extends/error';

async function fetch(r: Request, w: Response) {
  try {
    const event = await EventSvc.fetch();
    w.status(200).send(event);
  } catch (error) {
    const customError = error as ICustomError;
    return w
      .status(500)
      .json(
        ResponseUtils.ResponseData(
          customError.status,
          customError.message,
          null,
          null
        )
      );
  }
}

async function fetchByUser(r: Request, w: Response) {
  try {
    const { user_id } = r.params;

    const event = await EventSvc.fetchByUser(parseInt(user_id));
    w.status(200).send(event);
  } catch (error) {
    const customError = error as ICustomError;
    return w
      .status(500)
      .json(
        ResponseUtils.ResponseData(
          customError.status,
          customError.message,
          null,
          null
        )
      );
  }
}

async function create(r: Request, w: Response) {
  try {
    const { date } = r.body;
    const dateConvert = new Date(date).toISOString();
    const event = await EventSvc.create({ ...r.body, date: dateConvert });
    w.status(201).send(event);
  } catch (error) {
    const customError = error as ICustomError;
    return w
      .status(500)
      .json(
        ResponseUtils.ResponseData(
          customError.status,
          customError.message,
          null,
          null
        )
      );
  }
}

async function update(r: Request, w: Response) {
  try {
    const { id } = r.params;
    const event = await EventSvc.update(parseInt(id), r.body);
    w.status(200).send(
      ResponseUtils.ResponseData(200, 'Event updated', null, event)
    );
  } catch (error) {
    const customError = error as ICustomError;
    return w
      .status(500)
      .json(
        ResponseUtils.ResponseData(
          customError.status,
          customError.message,
          null,
          null
        )
      );
  }
}

async function remove(r: Request, w: Response) {
  try {
    const { id } = r.params;
    const event = await EventSvc.remove(parseInt(id));
    w.status(200).send(
      ResponseUtils.ResponseData(200, 'Event deleted', null, event)
    );
  } catch (error) {
    const customError = error as ICustomError;
    return w
      .status(500)
      .json(
        ResponseUtils.ResponseData(
          customError.status,
          customError.message,
          null,
          null
        )
      );
  }
}

async function createEventWithUser(r: Request, w: Response) {
  try {
    const authToken = r.headers['authorization'] as any;
    const token = authToken && authToken.split(' ')[1];
    const result = AuthUtils.ExtractToken(token);
    const { id } = result;

    const { event_id } = r.body;

    const data = await EventSvc.createEventWithUser(event_id, id);

    w.status(201).send(
      ResponseUtils.ResponseData(201, 'Event created', null, data)
    );
  } catch (error) {
    const customError = error as ICustomError;
    return w
      .status(customError.status)
      .send(
        ResponseUtils.ResponseData(
          customError.status,
          customError.message,
          null,
          null
        )
      );
  }
}

async function getOne(r: Request, w: Response) {
  try {
    const { id } = r.params;
    const event = await EventSvc.getOne(parseInt(id));
    w.status(200).send(
      ResponseUtils.ResponseData(200, 'Event found', null, event)
    );
  } catch (error) {
    const customError = error as ICustomError;
    return w
      .status(customError.status)
      .json(
        ResponseUtils.ResponseData(
          customError.status,
          customError.message,
          null,
          null
        )
      );
  }
}

export default {
  fetch,
  create,
  update,
  remove,
  createEventWithUser,
  fetchByUser,
  getOne,
};
