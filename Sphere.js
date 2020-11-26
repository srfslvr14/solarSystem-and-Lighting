class Sphere{
    // construct new Sphere object 
    constructor(){
        this.type           = 'sphere';
        this.color          = [1.0,1.0,1.0,1.0];
        this.matrix         = new Matrix4();
        this.normalMatrix   = new Matrix4();
        this.textureNum     = -2;
    }

    render(){
        var rgba = this.color;    // set rgba to the ith point's color field
        
        // Pass the texture number
        gl.uniform1i(u_whichTexture, this.textureNum);
        // Pass the color of point to u_FragColor
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);  
        // Pass the matrix to u_ModelMatrix attribute 
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        // Pass the matrix to u_NormallMatrix attribute 
        gl.uniformMatrix4fv(u_NormalMatrix, false, this.normalMatrix.elements);
        
        var d   = Math.PI/10;   //delta1
        var dd  = Math.PI/10;  //delta2

        for(var t=0; t<Math.PI; t=t+d){
            for(var r=0; r<(2*Math.PI); r=r+d){
                // console.log("t: "+t);
                // console.log("r: "+r);

                var p1  = [Math.sin(t)*Math.cos(r),       Math.sin(t)*Math.sin(r),       Math.cos(t)];
                var p2  = [Math.sin(t+dd)*Math.cos(r),    Math.sin(t+dd)*Math.sin(r),    Math.cos(t+dd)];
                var p3  = [Math.sin(t)*Math.cos(r+dd),    Math.sin(t)*Math.sin(r+dd),    Math.cos(t)];
                var p4  = [Math.sin(t+dd)*Math.cos(r+dd), Math.sin(t+dd)*Math.sin(r+dd), Math.cos(t+dd)];

                var uv1 = [t/Math.PI,       r/(2*Math.PI)];
                var uv2 = [(t+dd)/Math.PI,  r/(2*Math.PI)];
                var uv3 = [(t)/Math.PI,     (r+dd)/(2*Math.PI)];
                var uv4 = [(t+dd)/Math.PI,  (r+dd)/(2*Math.PI)];

                var v = [];
                v = v.concat(p1); 
                v = v.concat(p2);  
                v = v.concat(p4); 
                
                var uv = [];
                uv = uv.concat(uv1); 
                uv = uv.concat(uv2); 
                uv = uv.concat(uv4);
                drawTriangle3DUVNormal(v,uv,v);

                var v = [];
                v = v.concat(p1); 
                v = v.concat(p4);  
                v = v.concat(p3); 

                var uv = [];
                uv = uv.concat(uv1); 
                uv = uv.concat(uv4); 
                uv = uv.concat(uv3);

                drawTriangle3DUVNormal(v,uv,v);
            }
        }

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