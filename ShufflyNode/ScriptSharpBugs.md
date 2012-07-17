Dictionary<T,Action<*>> will not execute right. 
	Setup:			Dictionary<string,Action<object> foo;
	Expected:		foo["test"](true);
	Actual:			foot["test"];
Support for string scriptnames
	"Content-Type" has to be faked with Dictionary, instead of [scriptname] determining this key needs to be accessed as a hash (item["funky-key"] vs item.funky-key.

Allow an object to be created inline (translate to {foo:1,bar:2} somehow)
