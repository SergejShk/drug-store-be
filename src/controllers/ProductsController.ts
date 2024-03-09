import { RequestHandler } from "express";

import { Controller } from "./Controller";
import { BaseResponse, okResponse } from "../api/baseResponses";

import { ProductsService } from "../services/ProductsService";

import { InvalidParameterError } from "../errors/customErrors";

import { Product } from "../database/models/products";

import { newProductSchema } from "../dto/products";
import { defaultByIdSchema } from "../dto/common";

export class ProductsController extends Controller {
	productsService: ProductsService;

	constructor(productsService: ProductsService) {
		super("/products");

		this.productsService = productsService;

		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post("/", this.link({ route: this.createProduct }));
		this.router.get("/:shopId", this.link({ route: this.productsByShopId }));
	}

	private createProduct: RequestHandler<{}, BaseResponse<Product>> = async (req, res, next) => {
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

	private productsByShopId: RequestHandler<{ shopId: number }, BaseResponse<Product[]>> = async (
		req,
		res,
		next
	) => {
		try {
			const validatedBody = defaultByIdSchema.safeParse(req.params.shopId);
			if (!validatedBody.success) {
				throw new InvalidParameterError("Bad request");
			}

			const result = await this.productsService.productsByShopId(validatedBody.data);
			return res.status(200).json(okResponse(result));
		} catch (e) {
			next(e);
		}
	};
}
