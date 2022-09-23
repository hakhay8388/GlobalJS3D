var cParticalSolidMesh = function ()
{
	this.Vertex = [
		-3.091543, -0.000000, 3.101603, 
		3.091543, 0.000000, 0.000000, 
		-3.091543, 0.000000, -3.101603,
		0, 0, 0
	];

	this.UVTextureCoordinates = [
		0.012047, 0.888438, 
		0.535974, 0.012112, 
		0.96674, 0.894592
	];

	this.SurfaceVertexIndices = [
		0, 1, 2,
		0, 1, 3,
		1, 2, 3,
		2, 0, 3
	];

	this.SurfaceTextureIndices = [
		0, 1, 2, 
		0, 1, 2,
		0, 1, 2,
		0, 1, 2
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
