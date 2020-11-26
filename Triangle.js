class Triangle{
    // construct new triangle object 
    constructor(){
        this.type       = 'triangle';
        this.position   = [0.0,0.0,0.0];
        this.color      = [1.0,1.0,1.0,1.0];
        this.size       = 5.0;
    }

    render(){
        var xy   = this.position;                                       // set xy to the ith point's pos field
        var rgba = this.color;                                          // set rgba to the ith point's color field
        var size = this.size;                                           // set size to the ith point's size field
 
        // gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);            // Pass the position of point to a_Position
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);  // Pass the color of point to u_FragColor
        gl.uniform1f(u_Size, size);                                     // Pass the size of point to u_Size
                                
        var d = this.size/200.0;                                        // side length
        drawTriangle([xy[0], xy[1], xy[0]+d, xy[1], xy[0], xy[1]+d]);   // Draw triangle with selected verts
    }
}

function drawTriangle(vertices) {
    //   var vertices = new Float32Array([
    //     0, 0.5,   -0.5, -0.5,   0.5, -0.5
    //   ]);
    var n = 3; // The number of vertices

    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
    
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    gl.drawArrays(gl.TRIANGLES, 0, n);
}

var g_vertexBuffer = null;
function initTriagnle3D(){
    g_vertexBuffer = gl.createBuffer();
    if(!g_vertexBuffer){
        console.log('Failed to create the buffer object');
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexBuffer);
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
}

function drawTriangle3D(vertices) {
    var n = vertices.length/3;          // The number of triangles

    if(g_vertexBuffer == null){
        initTriagnle3D();
    }

    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

    gl.drawArrays(gl.TRIANGLES, 0, n);
} 

function drawTriangle3DUV(vertices, uv) {
    var n = vertices.length; // The number of vertices

    // Create a buffer object for verts
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);


    // Create a buffer object for UV
    var uvBuffer = gl.createBuffer();
    if (!uvBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.DYNAMIC_DRAW);
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_UV);
    
    gl.drawArrays(gl.TRIANGLES, 0, n/3);

    g_vertexBuffer = null;
} 

function drawTriangle3DUVNormal(vertices, uv, normal) {
    var n = vertices.length; // The number of vertices

    // Create a buffer object for verts
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the vertbuffer object');
        return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);


    // Create buffer object for UV
    var uvBuffer = gl.createBuffer();
    if (!uvBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_UV);


    // Create a buffer object for Normal
    var normalBuffer = gl.createBuffer();
    if (!normalBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normal), gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Normal);
    
    gl.drawArrays(gl.TRIANGLES, 0, n/3);

    gl.deleteBuffer(vertexBuffer);
    gl.deleteBuffer(uvBuffer);
    gl.deleteBuffer(normalBuffer);
} 