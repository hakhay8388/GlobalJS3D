﻿var cSphereLowRes = function ()
{

	this.Vertex = [
		0.321726, -0.788064, -0.321726, 
		0.000000, -0.788064, -0.454989, 
		-0.321726, -0.788064, -0.321726, 
		-0.454989, -0.788064, 0.000000, 
		-0.321726, -0.788064, 0.321726, 
		0.000000, -0.788064, 0.454989, 
		0.321726, -0.788064, 0.321726, 
		0.454989, -0.788064, 0.000000, 
		0.557245, -0.454989, -0.557245, 
		0.000000, -0.454989, -0.788064, 
		-0.557245, -0.454989, -0.557245, 
		-0.788064, -0.454989, 0.000000, 
		-0.557245, -0.454989, 0.557245, 
		0.000000, -0.454989, 0.788064, 
		0.557245, -0.454989, 0.557245, 
		0.788064, -0.454989, 0.000000, 
		0.643451, 0.000000, -0.643451, 
		0.000000, 0.000000, -0.909977, 
		-0.643451, 0.000000, -0.643451, 
		-0.909977, 0.000000, 0.000000, 
		-0.643451, 0.000000, 0.643451, 
		0.000000, 0.000000, 0.909977, 
		0.643451, 0.000000, 0.643451, 
		0.909978, 0.000000, 0.000000, 
		0.557245, 0.454989, -0.557245, 
		0.000000, 0.454989, -0.788064, 
		-0.557245, 0.454989, -0.557245, 
		-0.788064, 0.454989, 0.000000, 
		-0.557245, 0.454989, 0.557245, 
		0.000000, 0.454989, 0.788064, 
		0.557245, 0.454989, 0.557245, 
		0.788064, 0.454989, 0.000000, 
		0.321726, 0.788064, -0.321726, 
		0.000000, 0.788064, -0.454989, 
		-0.321726, 0.788064, -0.321726, 
		-0.454989, 0.788064, 0.000000, 
		-0.321726, 0.788064, 0.321726, 
		0.000000, 0.788064, 0.454989, 
		0.321726, 0.788064, 0.321726, 
		0.454989, 0.788064, 0.000000, 
		0.000000, -0.909978, 0.000000, 
		0.000000, 0.909978, 0.000000
	];

	this.UVTextureCoordinates = [
		0, 0.166667, 
		0.125, 0.166667, 
		0.25, 0.166667, 
		0.375, 0.166667, 
		0.5, 0.166667, 
		0.625, 0.166667, 
		0.75, 0.166667, 
		0.875, 0.166667, 
		1, 0.166667, 
		0, 0.333333, 
		0.125, 0.333333, 
		0.25, 0.333333, 
		0.375, 0.333333, 
		0.5, 0.333333, 
		0.625, 0.333333, 
		0.75, 0.333333, 
		0.875, 0.333333, 
		1, 0.333333, 
		0, 0.5, 
		0.125, 0.5, 
		0.25, 0.5, 
		0.375, 0.5, 
		0.5, 0.5, 
		0.625, 0.5, 
		0.75, 0.5, 
		0.875, 0.5, 
		1, 0.5, 
		0, 0.666667, 
		0.125, 0.666667, 
		0.25, 0.666667, 
		0.375, 0.666667, 
		0.5, 0.666667, 
		0.625, 0.666667, 
		0.75, 0.666667, 
		0.875, 0.666667, 
		1, 0.666667, 
		0, 0.833333, 
		0.125, 0.833333, 
		0.25, 0.833333, 
		0.375, 0.833333, 
		0.5, 0.833333, 
		0.625, 0.833333, 
		0.75, 0.833333, 
		0.875, 0.833333, 
		1, 0.833333, 
		0.0625, 0, 
		0.1875, 0, 
		0.3125, 0, 
		0.4375, 0, 
		0.5625, 0, 
		0.6875, 0, 
		0.8125, 0, 
		0.9375, 0, 
		0.0625, 1, 
		0.1875, 1, 
		0.3125, 1, 
		0.4375, 1, 
		0.5625, 1, 
		0.6875, 1, 
		0.8125, 1, 
		0.9375, 1
	];

	this.SurfaceVertexIndices = [
		0, 1, 9, 
		0, 9, 8, 
		1, 2, 10, 
		1, 10, 9, 
		2, 3, 11, 
		2, 11, 10, 
		3, 4, 12, 
		3, 12, 11, 
		4, 5, 13, 
		4, 13, 12, 
		5, 6, 14, 
		5, 14, 13, 
		6, 7, 15, 
		6, 15, 14, 
		7, 0, 8, 
		7, 8, 15, 
		8, 9, 17, 
		8, 17, 16, 
		9, 10, 18, 
		9, 18, 17, 
		10, 11, 19, 
		10, 19, 18, 
		11, 12, 20, 
		11, 20, 19, 
		12, 13, 21, 
		12, 21, 20, 
		13, 14, 22, 
		13, 22, 21, 
		14, 15, 23, 
		14, 23, 22, 
		15, 8, 16, 
		15, 16, 23, 
		16, 17, 25, 
		16, 25, 24, 
		17, 18, 26, 
		17, 26, 25, 
		18, 19, 27, 
		18, 27, 26, 
		19, 20, 28, 
		19, 28, 27, 
		20, 21, 29, 
		20, 29, 28, 
		21, 22, 30, 
		21, 30, 29, 
		22, 23, 31, 
		22, 31, 30, 
		23, 16, 24, 
		23, 24, 31, 
		24, 25, 33, 
		24, 33, 32, 
		25, 26, 34, 
		25, 34, 33, 
		26, 27, 35, 
		26, 35, 34, 
		27, 28, 36, 
		27, 36, 35, 
		28, 29, 37, 
		28, 37, 36, 
		29, 30, 38, 
		29, 38, 37, 
		30, 31, 39, 
		30, 39, 38, 
		31, 24, 32, 
		31, 32, 39, 
		1, 0, 40, 
		2, 1, 40, 
		3, 2, 40, 
		4, 3, 40, 
		5, 4, 40, 
		6, 5, 40, 
		7, 6, 40, 
		0, 7, 40, 
		32, 33, 41, 
		33, 34, 41, 
		34, 35, 41, 
		35, 36, 41, 
		36, 37, 41, 
		37, 38, 41, 
		38, 39, 41, 
		39, 32, 41
	];

	this.SurfaceTextureIndices = [
		0, 1, 10, 
		0, 10, 9, 
		1, 2, 11, 
		1, 11, 10, 
		2, 3, 12, 
		2, 12, 11, 
		3, 4, 13, 
		3, 13, 12, 
		4, 5, 14, 
		4, 14, 13, 
		5, 6, 15, 
		5, 15, 14, 
		6, 7, 16, 
		6, 16, 15, 
		7, 8, 17, 
		7, 17, 16, 
		9, 10, 19, 
		9, 19, 18, 
		10, 11, 20, 
		10, 20, 19, 
		11, 12, 21, 
		11, 21, 20, 
		12, 13, 22, 
		12, 22, 21, 
		13, 14, 23, 
		13, 23, 22, 
		14, 15, 24, 
		14, 24, 23, 
		15, 16, 25, 
		15, 25, 24, 
		16, 17, 26, 
		16, 26, 25, 
		18, 19, 28, 
		18, 28, 27, 
		19, 20, 29, 
		19, 29, 28, 
		20, 21, 30, 
		20, 30, 29, 
		21, 22, 31, 
		21, 31, 30, 
		22, 23, 32, 
		22, 32, 31, 
		23, 24, 33, 
		23, 33, 32, 
		24, 25, 34, 
		24, 34, 33, 
		25, 26, 35, 
		25, 35, 34, 
		27, 28, 37, 
		27, 37, 36, 
		28, 29, 38, 
		28, 38, 37, 
		29, 30, 39, 
		29, 39, 38, 
		30, 31, 40, 
		30, 40, 39, 
		31, 32, 41, 
		31, 41, 40, 
		32, 33, 42, 
		32, 42, 41, 
		33, 34, 43, 
		33, 43, 42, 
		34, 35, 44, 
		34, 44, 43, 
		1, 0, 45, 
		2, 1, 46, 
		3, 2, 47, 
		4, 3, 48, 
		5, 4, 49, 
		6, 5, 50, 
		7, 6, 51, 
		8, 7, 52, 
		36, 37, 53, 
		37, 38, 54, 
		38, 39, 55, 
		39, 40, 56, 
		40, 41, 57, 
		41, 42, 58, 
		42, 43, 59, 
		43, 44, 60
	];
	this.Translated_Vertex = [];
	this.SurfaceNormal = [];
	this.VertexNormal = [];

	this.Destroy = function ()
	{
		delete this.Translated_Vertex;
		delete this.Vertex;
		delete this.UVTextureCoordinates;
		delete this.SurfaceVertexIndices;
		delete this.SurfaceTextureIndices;
		delete this.SurfaceNormal;
		delete this.VertexNormal;
	}

}
