import { Request, Response } from 'express';
import EventSvc from '../services/event.service';
import ResponseUtils from '../utils/response';
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

export default { fetch, create, update, remove };
