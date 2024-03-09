import { RequestHandler } from "express";

import { Controller } from "./Controller";
import { BaseResponse, okResponse } from "../api/baseResponses";

import { ProductsService } from "../services/ProductsService";

import { InvalidParameterError } from "../errors/customErrors";

import { Shop } from "../database/models/shops";

import { newProductSchema } from "../dto/products";

export class ProductsController extends Controller {
	productsService: ProductsService;

	constructor(productsService: ProductsService) {
		super("/products");

		this.productsService = productsService;

		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post("/", this.link({ route: this.createProduct }));
	}

	private createProduct: RequestHandler<{}, BaseResponse<Shop>> = async (req, res, next) => {
		try {
			const validatedBody = newProductSchema.safeParse(req.body);
			if (!validatedBody.success) {
				throw new InvalidParameterError("Bad request");
			}

			const result = await this.productsService.create(validatedBody.data);
			return res.status(200).json(okResponse(result));
		} catch (e) {
			next(e);
		}
	};
}
