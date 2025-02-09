---
title: Lec1_线性方程组解的几何理解
published: 2024-08-25
description: ''
image: ''
tags: [Linear Algebra]
category: 'Math'
draft: false 
lang: ''
---

# Part 1 行图像 Row Picture

&emsp;&emsp;初高中阶段，我们对线性方程组已经有了一定的了解。线性方程组是由两个或多个线性方程组成的方程组，形如：
$$
\begin{cases}
a_{1,1}x_1+a_{1,2}x_2+···+a_{1,n}xn=b_1···&①\\
a_{2,1}x_1+a_{2,2}x_2+···+a_{2,n}xn=b_2···&②\\
····················\\
a_{m,1}x_1+a_{m,2}x_2+···+a_{m,n}xn=b_m···&Ⓜ\\
\end{cases}
$$
&emsp;&emsp;其中，$x_1、x_2、....、x_n$是要求解的未知数，其余均为已知的常数。

&emsp;&emsp;我们对其解的几何意义也有一定的认知，譬如对下面的二元线性方程组：
$$
\begin{cases}
2x-y=0······&①\\
-x+2y=3····&②
\end{cases}
$$
&emsp;&emsp;在$xoy$直角坐标系中来看，①代表了过原点$(0,0)$斜率为2的直线，②代表了过点$(-3,0)$斜率为$\frac{1}{2}$的直线。此时若解$(x,y)$存在，则即为两直线交点对应的坐标。我们只要找到①与②的交点，即可得到方程组的解。

&emsp;&emsp;类似地，对于三元线性方程组：
$$
\begin{cases}
2x&-~y&=0······&①\\
-x&+~2y-z&=-1····&②\\
&-~3y+4z&=4····&③
\end{cases}
$$
&emsp;&emsp;如果解存在的话，可以看作是三平面的交点，或者看作任意两平面的交线与第三个平面的交点。

&emsp;&emsp;在这个过程中，我们首先考虑每一行线性方程的几何意义，再考虑各行方程代表的几何图形之间的联系从而给出解的几何意义。这样逐行分析出的线性方程组的几何意义称为“行图像Row Picture”。

# Part 2 列图像 Column Picture

### 什么是列图像

&emsp;&emsp;在列图像中，我们观察方程组的每一列：将同一个未知数各行的系数以及右侧常数各自整合成一个向量，而将未知数看作是这个向量的系数。这样，线性方程组的左侧就成了若干个向量的加权和，右侧为常数组成的向量。求解未知数的问题变为了求解左侧各个向量的系数。我们依旧用刚刚的例子来解释一下：
$$
\begin{cases}
2x-y=0······&①\\
-x+2y=3····&②
\end{cases}
$$
&emsp;&emsp;将每列的系数视作一个向量，即：左侧的$\begin{bmatrix}2\\-1\end{bmatrix}$、$\begin{bmatrix}-1\\2\end{bmatrix}$和右侧的$\begin{bmatrix}0\\3\end{bmatrix}$。原方程组就改写为了：
$$
x\begin{bmatrix}2\\-1\end{bmatrix}+y\begin{bmatrix}-1\\2\end{bmatrix}=\begin{bmatrix}0\\3\end{bmatrix}
$$
&emsp;&emsp;初高中我们已了解了向量的数乘和加法，不难看出这种解释下的几何意义，即：用$x$个$\begin{bmatrix}2\\-1\end{bmatrix}$和$y$个$\begin{bmatrix}-1\\2\end{bmatrix}$组合成右侧向量$\begin{bmatrix}0\\3\end{bmatrix}$。虽然本节我们不关心如何求得具体解，但也可以目测得到解$x=1,y=2$。我们将$\begin{bmatrix}-1\\2\end{bmatrix}$伸长为原来的2倍，再与$\begin{bmatrix}2\\-1\end{bmatrix}$相加，从而得到$\begin{bmatrix}0\\3\end{bmatrix}$。

&emsp;&emsp;这里的$x、y$已经不再代表坐标的值，我们不妨将其改写为其它字母以防混淆。

&emsp;&emsp;类似地，方程组
$$
\begin{cases}
2p&-~q&=0······&①\\
-p&+~2q-r&=-1····&②\\
&-~3q+4r&=4····&③
\end{cases}
$$
&emsp;&emsp;也可以改写为$p\begin{bmatrix}2\\-1\\0\end{bmatrix}+q\begin{bmatrix}-1\\2\\-3\end{bmatrix}+r\begin{bmatrix}0\\-1\\4\end{bmatrix}=\begin{bmatrix}0\\-1\\4\end{bmatrix}$。

### 列图像有什么意义

&emsp;&emsp;列图像似乎很高级，但有什么作用呢？实际上，它是线性代数中“线性组合”这一重要概念的体现，展示了系数矩阵所能执行变换的限度，或者说“可以到达的范围”。

&emsp;&emsp;我们可以尝试用列图像来理解回答一个重要的问题：线性方程组在什么时候有解呢？

&emsp;&emsp;还是选择我们之前用过的例子来开始讨论：
$$
\begin{cases}
2p-q=0······&①\\
-p+2q=3····&②
\end{cases}
$$
&emsp;&emsp;它的左侧可以用列图形改写为：
$$
p\begin{bmatrix}2\\-1\end{bmatrix}+q\begin{bmatrix}-1\\2\end{bmatrix}
$$
&emsp;&emsp;容易想到，随着$p、q$取值的不断变化，两向量的和将有一个取值范围。在$xoy$直角坐标系中，单独的$p\begin{bmatrix}2\\-1\end{bmatrix}$可以表示经过点$(0,0)$与$(2,-1)$的直线。而由于$\begin{bmatrix}-1\\2\end{bmatrix}$与$\begin{bmatrix}2\\-1\end{bmatrix}$并不平行，$q\begin{bmatrix}-1\\2\end{bmatrix}$有在与$l$垂直方向的分量，与原直线相加后会使得直线沿垂直方向的平移，最终覆盖整个平面。至此我们可以知道，无论右侧的常数向量如何，都会存在这样的$(p,q)$使得等式成立，即方程始终有解。

&emsp;&emsp;类似地，我们继续分析三元线性方程组是否有解：
$$
p\begin{bmatrix}2\\-1\\0\end{bmatrix}+q\begin{bmatrix}-1\\2\\-3\end{bmatrix}+r\begin{bmatrix}0\\-1\\4\end{bmatrix}
$$
&emsp;&emsp;我们记：O=$(0,0,0)$，A=$(2,-1,0)$，B=$(-1,2,-3)$和C=$(0,-1,4)$。则$p\begin{bmatrix}2\\-1\\0\end{bmatrix}$表示直线OA。而OB$(-1,2,-3)$与OA不共线,存在垂直于OA方向的分量。因而$p\begin{bmatrix}2\\-1\\0\end{bmatrix}+q\begin{bmatrix}-1\\2\\-3\end{bmatrix}$的取值范围将会扩张为一个平面。我们可以通过计算知道该平面为$x+2y+z=0$。同样地，向量$(0,-1,4)$存在垂直于该平面的分量，因此在它的作用下原平面将会沿着垂线方向发生平移。最终$p\begin{bmatrix}2\\-1\\0\end{bmatrix}+q\begin{bmatrix}-1\\2\\-3\end{bmatrix}+r\begin{bmatrix}0\\-1\\4\end{bmatrix}$的取值范围就将是整个三维空间。这样以来，我们就知道无论右侧的常数向量如何变动，方程均会有解。

&emsp;&emsp;我们也容易举出这样的例子：
$$
p\begin{bmatrix}2\\-1\end{bmatrix}+q\begin{bmatrix}-4\\2\end{bmatrix}
$$
&emsp;&emsp;这两个向量共线，它们的线性组合将始终在同一条直线上。如果常数向量不能落在这条直线上，则线性方程组将无解；而当落在直线上时，通过调整$p$和$q$的值可得到无穷多组解。比如当$(m,n)$为一个解时，$(m+2,n+1)$也将是一个解。

&emsp;&emsp;我们还可以考察一下下面这个例子。
$$
p\begin{bmatrix}2\\-1\\0\end{bmatrix}+q\begin{bmatrix}-1\\2\\-3\end{bmatrix}+r\begin{bmatrix}1\\1\\-3\end{bmatrix}
$$
&emsp;&emsp;在这个例子中，前两个向量的线性组合仍可以完整地表示一个平面。但第三个向量在该平面中，不能提供垂直于该平面的分量，最终的表示范围仍为原平面。因此，当常数向量落在平面外时，线性方程组无解；当落在平面内时，线性方程组有且有无穷多个解。

&emsp;&emsp;经过了这个讨论，我们还可以简单讨论一下已知无论右侧常数向量为何值方程组均有解时，也可以得到该解唯一。以二元线性方程组为例，记录两个列向量为A和B，假设有$(m,n)$和$(c,d)$两组不同解，则有$mA+nB=cA+dB$，也就是$(m-c)A=(d-n)B$，两列向量共线，其线性组合不可能覆盖整个二维平面，与前提矛盾，故假设不成立。对于更多元线性方程组的证明类似，只需要证明存在若干个列向量可以相互表示，共存于更低维的子空间中即可。
$$
已知:无论n元线性方程组的右侧常数向量为何值，方程组均有解\\
则有:列图像可以覆盖整个n元空间\\
记n个列向量分别为A_1,A_2,…,A_n,假设有(a_1,a_2,…,a_n)和(b_1,b_2,…,b_n)两组不同解\\
则有:a_1A_1+a_2A_2+…+a_nA_n=b_1A_1+b_2A_2+…+b_nA_n\\
取任何一个满足a_m-b_m≠0的m,则有:\\
(a_m-b_m)A_m=(b_1-a_1)A_1+…+(b_{m-1}-a_{m-1})A_{m-1}+(b_{m+1}-a_{m+1})A_{m+1}+…(b_n-a_n)A_n\\
也就是A_m可以由A_1,…,A_{m-1},A_{m+1},…,A_n线性表示,这n个向量共处于一个n-1维空间\\
当右侧向量落在这个n-1维空间外时,方程将无解,与已知不符\\
因此假设不成立,方程组的解存在且唯一。\square\\
$$
&emsp;使得线性方程组有且仅有唯一解的关键因素在于每一个列向量都能提供垂直于由前面的列向量线性组合得到的空间（原点、直线、平面.....）的分量来使得表示的空间向更高维“开疆拓土”。如果任何一个向量被完全包括在已有的表示范围内，则最终的表示范围都将低于方程组的维数，使得表示的范围不能覆盖n维空间，线性方程组就只能有无穷多组解或无解。
