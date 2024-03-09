import { RequestHandler } from "express";

import { Controller } from "./Controller";
import { BaseResponse, okResponse } from "../api/baseResponses";

import { ShopsService } from "../services/ShopsService";

import { InvalidParameterError } from "../errors/customErrors";

import { Shop } from "../database/models/shops";

import { newShopSchema } from "../dto/shops";

export class ShopsController extends Controller {
	shopsService: ShopsService;

	constructor(shopsService: ShopsService) {
		super("/shops");

		this.shopsService = shopsService;

		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post("/", this.link({ route: this.createShop }));
	}

	private createShop: RequestHandler<{}, BaseResponse<Shop>> = async (req, res, next) => {
		try {
			const validatedBody = newShopSchema.safeParse(req.body);
			if (!validatedBody.success) {
				throw new InvalidParameterError("Bad request");
			}

			const result = await this.shopsService.create(validatedBody.data);
			return res.status(200).json(okResponse(result));
		} catch (e) {
			next(e);
		}
	};
}
