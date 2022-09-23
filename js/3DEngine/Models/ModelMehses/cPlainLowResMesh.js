var cPlainLowResMesh = function ()
{

	this.Vertex = [
		-0.500000, -0.000000, 0.500000, 
		0.500000, -0.000000, 0.500000, 
		-0.500000, 0.000000, -0.500000, 
		0.500000, 0.000000, -0.500000
	];

	this.UVTextureCoordinates = [
		0, 0, 
		1, 0, 
		0, 1, 
		1, 1
	];

	this.SurfaceVertexIndices = [
		0, 1, 3, 
		0, 3, 2
	];

	this.SurfaceTextureIndices = [
		0, 1, 3, 
		0, 3, 2
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
