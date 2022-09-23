
function StringUtils()
{
}

StringUtils.SubString = function (_Text, _StartIndex, _Count)
{
	var __String = _Text.substring(_StartIndex, _StartIndex + _Count);
	return __String;
}

StringUtils.SelectedFont = new cArial();

StringUtils.GetWidth = function (_Text, _Posision, _Punto)
{
	return StringUtils.SelectedFont.GetPosisionInPixel(_Text, _Posision, _Punto);
}
