var cRootModelMesh = function ()
{

	this.Vertex = [
		-0.268929, -0.000000, 0.174371, 
		-0.263280, -0.000000, 0.172595, 
		-0.268929, 0.000000, 0.169288
	];

	this.UVTextureCoordinates = [
		0, 0, 
		0.765142, 0, 
		0, 1
	];

	this.SurfaceVertexIndices = [
		0, 1, 2
	];

	this.SurfaceTextureIndices = [
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
