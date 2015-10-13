exports = module.exports = Proxy;

var http = require('http');

function Proxy(hostname, port, caching) {
  this.hostname = hostname;
  this.port = port;
  this.cache = {};                    // Cache that provides previously returned results while querying for new one. Used only on GET
  this.caching = caching;             // Setting caching to true will cause GET queries to be behind by one result
}

Proxy.prototype.request = function(req, res) {
  var options = this.configure(req.method, req.headers);
  var proxyRequest = http.request(options, function(proxyResponse) {
    proxyResponse.on('data', function(chunk) {
      res.write(chunk, 'binary');
    });
    proxyResponse.on('end', function() {
      res.end();
    });
    res.writeHead(proxyResponse.statusCode, proxyResponse.headers);
  });
  req.on('data', function(chunk) {
    proxyRequest.write(chunk, 'binary');
  });
  req.on('end', function() {
    proxyRequest.end();
  });
};

Proxy.prototype.cached = function(req, res) {
  var identifier = req.method + ' ' + req.url,
    cached = this.cache[identifier],
    options = this.configure(req.method, req.headers);

  if (cached) {
    res.writeHead(cached.data.status, cached.data.headers);
    res.write(cached.data.response, 'binary');
    res.end();
  }

  var requestData = '',
    responseData = '',
    _this = this;
  var proxyRequest = http.request(options, function(proxyResponse) {
    proxyResponse.on('data', function(chunk) {
      if (!cached) {
        res.write(chunk, 'binary');
      }
      responseData += chunk;
    });
    proxyResponse.on('end', function() {
      if (!cached) {
        res.end();
      }
      _this.cache[identifier] = {
        identifier: {
          url: req.url,
          method: req.method
        },
        data: {
          status: proxyResponse.statusCode,
          reason: proxyResponse.reason,
          headers: proxyResponse.headers,
          request: requestData,
          response: responseData
        }
      };
    });

    if (!cached) {
      res.writeHead(proxyResponse.statusCode, proxyResponse.headers);
    }
  });
  req.on('data', function(chunk) {
    proxyRequest.write(chunk, 'binary');
    requestData += chunk;
  });
  req.on('end', function() {
    proxyRequest.end();
  });
};

Proxy.prototype.serve = function(req, res, next) {
  if (this.caching && !this.alreadyWarned) {
    this.alreadyWarned = true;
    console.log('BEWARE!!! This development proxy has caching enabled meaning that all GET queries returned after the first one will be behind by 1');
  }

  this.url = req.url;
  if (this.url.indexOf("/rest/") !== -1) {
    this.setUrl();
    if (this.caching && req.method === 'GET') {
      this.cached(req, res);
    }
    else {
      this.request(req, res);
    }
  } else {
    return next();
  }
};

Proxy.prototype.setUrl = function() {
  if (this.url.indexOf("/reach-console/rest/") === -1) {
    this.url = '/reach-console' + this.url;
  }
};

Proxy.prototype.determineSID = function(headers) {
  return (headers['janus_sid'] || process.env.USER || process.env.USERNAME || 'F552431').toUpperCase();
};

Proxy.prototype.configure = function(method, headers) {
  return {
    method: method,
    hostname: this.hostname,
    port: this.port,
    path: this.url,
    headers: {
      'janus_sid': this.determineSID(headers),
      'content-type': 'application/json'
    }
  };
};
