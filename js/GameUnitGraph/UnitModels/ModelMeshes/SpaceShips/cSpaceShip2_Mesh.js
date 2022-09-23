var cSpaceShip2_Mesh = function ()
{

	this.Vertex = [
		0.000000, -0.927041, -5.387290, 
		-7.333498, -1.014931, 5.387290, 
		7.333498, -1.014931, 5.387290, 
		0.000000, 1.014931, 7.363761
	];

	this.UVTextureCoordinates = [
		0.448146, 0.001868, 
		0.970483, 0.935768, 
		0.998008, 0.491761, 
		0.752878, 0.500558, 
		0.001992, 0.003871, 
		0.437203, 0.003871, 
		0.230541, 0.654684, 
		0.665752, 0.654683, 
		0.834804, 0.002149, 
		0.219597, 0.656687, 
		0.535273, 0.935768, 
		0.6716, 0.491761
	];

	this.SurfaceVertexIndices = [
		0, 2, 1, 
		1, 2, 3, 
		0, 3, 2, 
		3, 0, 1
	];

	this.SurfaceTextureIndices = [
		8, 2, 11, 
		1, 10, 3, 
		9, 4, 5, 
		6, 0, 7
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
