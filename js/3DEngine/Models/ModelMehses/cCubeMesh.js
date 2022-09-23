var cCubeMesh = function ()
{

	this.Vertex = [
		-5.000000, -5.000000, 5.000000, 
		5.000000, -5.000000, 5.000000, 
		-5.000000, 5.000000, 5.000000, 
		5.000000, 5.000000, 5.000000, 
		-5.000000, 5.000000, -5.000000, 
		5.000000, 5.000000, -5.000000, 
		-5.000000, -5.000000, -5.000000, 
		5.000000, -5.000000, -5.000000
	];

	this.UVTextureCoordinates = [
		0.375, 0, 
		0.625, 0, 
		0.375, 0.25, 
		0.625, 0.25, 
		0.375, 0.5, 
		0.625, 0.5, 
		0.375, 0.75, 
		0.625, 0.75, 
		0.375, 1, 
		0.625, 1, 
		0.875, 0, 
		0.875, 0.25, 
		0.125, 0, 
		0.125, 0.25
	];

	this.SurfaceVertexIndices = [
		0, 1, 3, 
		0, 3, 2, 
		2, 3, 5, 
		2, 5, 4, 
		4, 5, 7, 
		4, 7, 6, 
		6, 7, 1, 
		6, 1, 0, 
		1, 7, 5, 
		1, 5, 3, 
		6, 0, 2, 
		6, 2, 4
	];

	this.SurfaceTextureIndices = [
		0, 1, 3, 
		0, 3, 2, 
		2, 3, 5, 
		2, 5, 4, 
		4, 5, 7, 
		4, 7, 6, 
		6, 7, 9, 
		6, 9, 8, 
		1, 10, 11, 
		1, 11, 3, 
		12, 0, 2, 
		12, 2, 13
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
