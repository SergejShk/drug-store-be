import { RequestHandler } from "express";

import { Controller } from "./Controller";
import { BaseResponse, okResponse } from "../api/baseResponses";

import { OrdersService } from "../services/OrdersService";

import { InvalidParameterError } from "../errors/customErrors";

import { Order } from "../database/models/orders";

import { newOrderSchema } from "../dto/orders";

export class OrdersController extends Controller {
	ordersService: OrdersService;

	constructor(ordersService: OrdersService) {
		super("/orders");

		this.ordersService = ordersService;

		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post("/", this.link({ route: this.createOrder }));
	}

	private createOrder: RequestHandler<{}, BaseResponse<Order>> = async (req, res, next) => {
		try {
			const validatedBody = newOrderSchema.safeParse(req.body);
			if (!validatedBody.success) {
				throw new InvalidParameterError("Bad request");
			}

			const result = await this.ordersService.create(validatedBody.data);
			return res.status(200).json(okResponse(result));
		} catch (e) {
			next(e);
		}
	};
}
