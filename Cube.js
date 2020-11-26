class Cube{
    // construct new triangle object 
    constructor(){
        this.type           = 'cube';
        this.color          = [1.0,1.0,1.0,1.0];
        this.matrix         = new Matrix4();
        this.normalMatrix   = new Matrix4();
        this.textureNum     = -2;

        this.verts = [
            // Front of cube
            0,0,0, 1,1,0, 1,0,0,
            0,0,0, 0,1,0, 1,1,0,

            // Top of cube
            0,1,0, 1,1,1, 1,1,0,
            0,1,0, 0,1,1, 1,1,1,

            // Bottom of cube
            0,1,0, 1,1,1, 1,1,0,
            0,1,0, 0,1,1, 1,1,1,

            // Left side of cube
            1,0,0, 1,1,1, 1,1,0,
            1,0,0, 1,0,1, 1,1,1,

            // Right side of cube
            0,0,0, 0,1,1, 0,1,0,
            0,0,0, 0,0,1, 0,1,1,
            
            // Back of cube 
            0,0,1, 1,1,1, 0,1,1,
            0,0,1, 1,0,1, 1,1,1
        ];
        this.vert32bit = new Float32Array([
            0,0,0, 1,1,0, 1,0,0,
            0,0,0, 0,1,0, 1,1,0,
    
            0,1,0, 0,1,1, 1,1,1,
            0,1,0, 1,1,1, 1,1,0,
    
            0,1,0, 0,1,1, 1,1,1,
            0,1,0, 1,1,1, 1,1,0,
    
            0,0,0, 1,0,1, 0,0,1,
            0,0,0, 1,0,0, 1,0,1,
    
            1,0,0, 1,1,1, 1,1,0,
            1,0,0, 1,0,1, 1,1,1,
    
            0,0,1, 1,1,1, 0,1,1,
            0,0,1, 1,0,1, 1,1,1
        ]);
        this.uvVerts  = [
            0,0, 1,1, 1,0,  0,0, 0,1, 1,1,
            0,0, 1,1, 1,0,  0,0, 0,1, 1,1,
            0,0, 1,1, 1,0,  0,0, 0,1, 1,1,
            0,0, 1,1, 1,0,  0,0, 0,1, 1,1,
            0,0, 1,1, 1,0,  0,0, 0,1, 1,1,
            0,0, 1,1, 1,0,  0,0, 0,1, 1,1
        ];
        this.NormalVerts = [
            0,0,-1, 0,0,-1, 0,0,-1,
            0,0,-1, 0,0,-1, 0,0,-1,
            0,1,0, 0,1,0, 0,1,0,
            0,1,0, 0,1,0, 0,1,0,
            0,-1,0, 0,-1,0, 0,-1,0,
            0,-1,0, 0,-1,0, 0,-1,0,
            1,0,0, 1,0,0, 1,0,0,
            1,0,0, 1,0,0, 1,0,0,
            -1,0,0, -1,0,0, -1,0,0,
            -1,0,0, -1,0,0, -1,0,0,
            0,0,1, 0,0,1, 0,0,1,
            0,0,1, 0,0,1, 0,0,1
        ]
    }

    render(){
        var rgba = this.color;                                           // set rgba to the ith point's color field
        
        // Pass the texture number
        gl.uniform1i(u_whichTexture, this.textureNum);
        // Pass the color of point to u_FragColor
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);  
        // Pass the matrix to u_ModelMatrix attribute 
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        // Pass the matrix to u_NormallMatrix attribute 
        gl.uniformMatrix4fv(u_NormalMatrix, false, this.normalMatrix.elements);
        
        // Front of cube
        drawTriangle3DUVNormal([0,0,0,  1,1,0,  1,0,0], [0,0, 1,1, 1,0], [0,0,-1, 0,0,-1, 0,0,-1]);
        drawTriangle3DUVNormal([0,0,0,  0,1,0,  1,1,0], [0,0, 0,1, 1,1], [0,0,-1, 0,0,-1, 0,0,-1]);

        // Top of cube
        drawTriangle3DUVNormal([0,1,0,  1,1,1,  1,1,0], [0,0, 1,1, 1,0], [0,1,0, 0,1,0, 0,1,0]);
        drawTriangle3DUVNormal([0,1,0,  0,1,1,  1,1,1], [0,0, 0,1, 1,1], [0,1,0, 0,1,0, 0,1,0]);

        // Bottom of cube
        drawTriangle3DUVNormal([0,0,0,  1,0,1,  0,0,1], [0,0, 1,1, 1,0], [0,-1,0, 0,-1,0, 0,-1,0]);
        drawTriangle3DUVNormal([0,0,0,  1,0,0,  1,0,1], [0,0, 0,1, 1,1], [0,-1,0, 0,-1,0, 0,-1,0]);

        // Left side of cube
        drawTriangle3DUVNormal([1,0,0,  1,1,1,  1,1,0], [0,0, 1,1, 1,0], [1,0,0, 1,0,0, 1,0,0]);
        drawTriangle3DUVNormal([1,0,0,  1,0,1,  1,1,1], [0,0, 0,1, 1,1], [1,0,0, 1,0,0, 1,0,0]);

        // Right side of cube
        drawTriangle3DUVNormal([0,0,0,  0,1,1,  0,1,0], [0,0, 1,1, 1,0], [-1,0,0, -1,0,0, -1,0,0]);
        drawTriangle3DUVNormal([0,0,0,  0,0,1,  0,1,1], [0,0, 0,1, 1,1], [-1,0,0, -1,0,0, -1,0,0]);

        // Back of cube
        drawTriangle3DUVNormal([0,0,1,  1,1,1,  0,1,1], [0,0, 1,1, 1,0], [0,0,1, 0,0,1, 0,0,1]);
        drawTriangle3DUVNormal([0,0,1,  1,0,1,  1,1,1], [0,0, 0,1, 1,1], [0,0,1, 0,0,1, 0,0,1]);

    }

    renderfaster(){
        var rgba = this.color;                                           // set rgba to the ith point's color field
        
        // Pass the texture number
        gl.uniform1i(u_whichTexture, this.textureNum);
        // Pass the color of point to u_FragColor
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);  
        // Pass the matrix to u_ModelMatrix attribute 
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        
        drawTriangle3DUVNormal(this.verts, this.uvVerts, this.NormalVerts);
    }
}
    // renderfast(){
    //     var rgba = this.color;
    //     gl.uniform1i(u_whichTexture, this.textureNum);
    //     gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    //     gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        
    //     var allverts = [];

    //     // Front of cube
    //     allverts = allverts.concat([0,0,0, 1,1,0, 1,0,0]);
    //     allverts = allverts.concat([0,0,0, 0,1,0, 1,1,0]);

    //     // Top of cube
    //     allverts = allverts.concat([0,1,0, 0,1,1, 1,1,1]);
    //     allverts = allverts.concat([0,1,0, 1,1,1, 1,1,0]);

    //     // Bottom of cube
    //     allverts = allverts.concat([0,1,0, 0,1,1, 1,1,1]);
    //     allverts = allverts.concat([0,1,0, 1,1,1, 1,1,0]);

    //     // Right of cube
    //     allverts = allverts.concat([0,0,0, 1,0,1, 0,0,1]);
    //     allverts = allverts.concat([0,0,0, 1,0,0, 1,0,1]);

    //     // Left of cube
    //     allverts = allverts.concat([1,0,0, 1,1,1, 1,1,0]);
    //     allverts = allverts.concat([1,0,0, 1,0,1, 1,1,1]);

    //     // Back of cube
    //     allverts = allverts.concat([0,0,1, 1,1,1, 0,1,1]);
    //     allverts = allverts.concat([0,0,1, 1,0,1, 1,1,1]);

    //     drawTriangle3D(allverts);
    // }

//comments if needed
    // var uvVerts  = [
    //     [0,0, 1,1, 1,0], [0,0, 0,1, 1,1],
    //     [0,0, 1,1, 1,0], [0,0, 0,1, 1,1],
    //     [0,0, 1,1, 1,0], [0,0, 0,1, 1,1],
    //     [0,0, 1,1, 1,0], [0,0, 0,1, 1,1],
    //     [0,0, 1,1, 1,0], [0,0, 0,1, 1,1],
    //     [0,0, 1,1, 1,0], [0,0, 0,1, 1,1],
    //     ];
    
    //     this.vert32bit = new Float32Array([
    //         0,0,0, 1,1,0, 1,0,0,
    //         0,0,0, 0,1,0, 1,1,0,
    
    //         0,1,0, 0,1,1, 1,1,1,
    //         0,1,0, 1,1,1, 1,1,0,
    
    //         0,1,0, 0,1,1, 1,1,1,
    //         0,1,0, 1,1,1, 1,1,0,
    
    //         0,0,0, 1,0,1, 0,0,1,
    //         0,0,0, 1,0,0, 1,0,1,
    
    //         1,0,0, 1,1,1, 1,1,0,
    //         1,0,0, 1,0,1, 1,1,1,
    
    //         0,0,1, 1,1,1, 0,1,1,
    //         0,0,1, 1,0,1, 1,1,1
    //     ]);
    
    
    //     var rgba = this.color;
    //     gl.uniform1i(u_whichTexture, this.textureNum);
    //     gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    //     gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        
    //     if(g_vertexBuffer == null){
    //         initTriagnle3D();
    //     }
    
    //     gl.bufferData(gl.ARRAY_BUFFER, this.vert32bit, gl.DYNAMIC_DRAW);
    //     gl.drawArrays(gl.TRIANGLES, 0, 36);