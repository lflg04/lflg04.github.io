---
title: Lec3_矩阵乘法与逆矩阵
published: 2024-09-03
description: ''
image: ''
tags: [Linear Algebra]
category: 'Math'
draft: false 
lang: ''
---

# Part 1 矩阵乘法的四种理解

&emsp;&emsp;前一节，我们在开篇稍稍聊了一下矩阵乘法的理解，即使用列图像的方法，将矩阵乘列向量看作是矩阵列向量依据列向量给出的系数进行线性组合。基于这种理解，我们可以很好地理解初等列变换矩阵，也可以简明地证明行变换矩阵的工作原理。除了这种理解以外，矩阵乘法还可以以很多方式诠释。本节我们继续对其它三种进行简单地介绍。

## (2)

&emsp;&emsp;第二种理解方式可以说是在了解第一种理解方式后容易想到的，或者说基于初等行变换矩阵容易想到的，即将行向量乘以矩阵视为“根据左侧矩阵中行向量指定的系数对右侧矩阵的行向量进行线性组合”。可以通过下面这个例子来直观理解。
$$
\begin{bmatrix}
m&n&p\\
\end{bmatrix}
\begin{bmatrix}
1&2&3\\
4&5&6\\
7&8&9\\
\end{bmatrix}\\
=m[~1~2~3~]+n[~4~5~6~]+p~[~7~8~9~]=[~m+4n+7p~~~~~2m+5n+8p~~~~~3m+6n+9p~]
$$
&emsp;&emsp;左侧矩阵行数大于一时可以根据系数行向量所在的位置进行排列。这种理解下，行变换初等矩阵的工作原理也更加的容易理解。比如下面这个行变换初等矩阵的例子。
$$
\begin{bmatrix}
1&0&1\\
0&2&0\\
0&0&1\\
\end{bmatrix}\begin{bmatrix}
1&2&3\\
4&5&6\\
7&8&9\\
\end{bmatrix}
=\begin{bmatrix}
1+0+7&2+0+8&3+0+9\\
0+8+0&0+10+0&0+12+0\\
0+0+7&0+0+8&0+0+9
\end{bmatrix}
=\begin{bmatrix}
8&10&12\\
8&10&12\\
7&8&9
\end{bmatrix}
$$

## (3)

&emsp;&emsp;第三种理解方式与前两种理解方式则不同。我们从基本的列向量乘行向量开始研究。当我们有一个列向量与一个行向量相乘后，会得到一个矩阵。
$$
\begin{bmatrix}
a_1\\
a_2\\
···\\
a_m\\
\end{bmatrix}
\begin{bmatrix}
b_1&b_2&···b_n
\end{bmatrix}
=\begin{bmatrix}
a_1b_1&a_1b_2&···&a_1b_n\\
a_2b_2&···&···&···\\
···&···&···&···\\
a_mb_1&···&···&a_mb_n
\end{bmatrix}
$$
&emsp;&emsp;我们不妨举一个具体一些的例子，结果矩阵中每列都与列向量成比例，每行都与行向量成比例。：
$$
\begin{bmatrix}
2\\
5\\
3\\
\end{bmatrix}
\begin{bmatrix}
4&7
\end{bmatrix}
=\begin{bmatrix}
8&14\\
20&35\\
12&21
\end{bmatrix}
$$
&emsp;&emsp;我们还可以再举出类似的例子：
$$
\begin{bmatrix}
1\\
7\\
9\\
\end{bmatrix}\begin{bmatrix}
2&5
\end{bmatrix}
=\begin{bmatrix}
2&5\\
14&35\\
18&45
\end{bmatrix}
$$
&emsp;&emsp;当我们将该过程中的两个列向量组合起来，两个行向量组合起来，再将得到的两矩阵相乘时，我们会发现：
$$
\begin{bmatrix}
2&1\\
5&7\\
3&9\\
\end{bmatrix}
\begin{bmatrix}
4&7\\
2&5
\end{bmatrix}
=\begin{bmatrix}
10&19\\
34&70\\
30&66
\end{bmatrix}=\begin{bmatrix}
8&14\\
20&35\\
12&21
\end{bmatrix}+\begin{bmatrix}
2&5\\
14&35\\
18&45
\end{bmatrix}
$$
&emsp;&emsp;组合后的矩阵乘积实际上会等于组合前各自乘积的和。我们调转顺序可以再验证一下：
$$
\begin{bmatrix}
2\\
5\\
3\\
\end{bmatrix}
\begin{bmatrix}
2&5
\end{bmatrix}
=\begin{bmatrix}
4&10\\
10&25\\
6&15
\end{bmatrix},\begin{bmatrix}
1\\
7\\
9\\
\end{bmatrix}
\begin{bmatrix}
4&7
\end{bmatrix}
=\begin{bmatrix}
4&7\\
28&49\\
36&63
\end{bmatrix},\begin{bmatrix}
2&1\\
5&7\\
3&9\\
\end{bmatrix}
\begin{bmatrix}
2&5\\
4&7
\end{bmatrix}
=\begin{bmatrix}
8&17\\
38&74\\
42&78
\end{bmatrix}
$$
&emsp;&emsp;结论依然成立。

&emsp;&emsp;实际上，这样的分解-组合过程是对矩阵乘法的定义式进行了分解。具体来说：
$$
\begin{bmatrix}
a_{1,1}&a_{1,2}&···&a_{1,n}\\
a_{2,1}&a_{2,2}&···&a_{2,n}\\
···\\
a_{m,1}&a_{m,2}&···&a_{m,n}\\
\end{bmatrix}
\begin{bmatrix}
b_{1,1}&b_{1,2}&···&b_{1,p}\\
b_{2,1}&b_{2,2}&···&b_{2,p}\\
···\\
b_{n,1}&b_{n,2}&···&b_{n,p}\\
\end{bmatrix}
=\begin{bmatrix}
a_{1,1}b_{1,1}+a_{1,2}b_{2,1}+…+a_{1,n}b_{n,1}&···&···\\
···&···&···\\
···&···&a_{m,1}b_{1,p}+a_{m,2}b_{2,p}+···+a_{m,n}b_{n,p}
\end{bmatrix}
$$
&emsp;&emsp;我们将矩阵中每个和式的第一项拆出来组成一个矩阵，也就是：
$$
\begin{bmatrix}
a_{1,1}b_{1,1}&a_{1,1}b_{1,2}&···&a_{1,1}b_{1,p}\\
···&···&···&···\\
a_{m,1}b_{1,1}&···&···&a_{m,1}b_{1,n}
\end{bmatrix}
$$
&emsp;&emsp;它也就等于：
$$
=\begin{bmatrix}
a_{1,1}\\
a_{2,1}\\
···\\
a_{m,1}\\
\end{bmatrix}
\begin{bmatrix}
b_{1,1}&b_{1,2}&···b_{1,n}
\end{bmatrix}
$$
&emsp;&emsp;类似地，我们依次取每个和式的第$t$项，就可以得到这样的$t$个分解，也就得到了证明。
$$
\begin{bmatrix}
a_{1,t}b_{t,1}&a_{1,t}b_{t,2}&···&a_{1,t}b_{t,p}\\
···&···&···&···\\
a_{m,t}b_{t,1}&···&···&a_{m,t}b_{t,n}
\end{bmatrix}=\begin{bmatrix}
a_{1,t}\\
a_{2,t}\\
···\\
a_{m,t}\\
\end{bmatrix}
\begin{bmatrix}
b_{t,1}&b_{t,2}&···b_{t,n}
\end{bmatrix}
$$
&emsp;&emsp;我们也就得到了结论：
$$
\sum_{t=1}^n\begin{bmatrix}
a_{1,t}\\
a_{2,t}\\
···\\
a_{m,t}\\
\end{bmatrix}
\begin{bmatrix}
b_{t,1}&b_{t,2}&···b_{t,p}
\end{bmatrix}=\begin{bmatrix}
a_{1,1}&a_{1,2}&···&a_{1,n}\\
a_{2,1}&a_{2,2}&···&a_{2,n}\\
···\\
a_{m,1}&a_{m,2}&···&a_{m,n}\\
\end{bmatrix}
\begin{bmatrix}
b_{1,1}&b_{1,2}&···&b_{1,p}\\
b_{2,1}&b_{2,2}&···&b_{2,p}\\
···\\
b_{n,1}&b_{n,2}&···&b_{n,p}\\
\end{bmatrix}
$$

## (4)

&emsp;&emsp;我们对矩阵进行分块。只要能够保证划分使得矩阵乘法有意义，对分块之后的矩阵按照矩阵乘法的法则进行计算得到的结果就将与原矩阵相乘的结果相同。

&emsp;&emsp;形式化地表达为：
$$
\begin{bmatrix}
a_{1,1}&a_{1,2}|&···&a_{1,n}\\
\underline{a_{2,1}}&\underline{a_{2,2}|}&\underline{…}&\underline{a_{2,n}}\\
···&~~~~~~~|\\
a_{m,1}&a_{m,2}|&···&a_{m,n}\\
\end{bmatrix}
\begin{bmatrix}
b_{1,1}&b_{1,2}|&···&b_{1,p}\\
\underline{b_{2,1}}&\underline{b_{2,2}}|&\underline{…}&\underline{b_{2,p}}\\
···&~~~~~~~|\\
b_{n,1}&b_{n,2}|&···&b_{n,p}\\
\end{bmatrix}=\begin{bmatrix}
A_{1}&A_{2}\\
A_{3}&A_{4}
\end{bmatrix}\begin{bmatrix}
B_{1}&B_{2}\\
B_{3}&B_{4}
\end{bmatrix}=\begin{bmatrix}
A_{1}B_1+A_2B_3&A_1B_2+A_{2}B_4\\
A_{3}B_1+A_4B_3&A_3B_2+A_{4}B_4
\end{bmatrix}
$$
&emsp;&emsp;关于其的证明与(3)类似。对每个元素的和式进行分解，分解时截断的粒度与分块的大小相适应即可。当然也可以直接进行验算来证明。

# Part 2 逆矩阵

&emsp;&emsp;我们之前提到过初等变换矩阵。已知一个矩阵$A$通过初等列变换矩阵$M$得到了矩阵$B=AM$。B应该通过什么样的初等列变换矩阵$N$能够使变回$A$呢？这时求矩阵$N$的过程实际上就是在求矩阵$M$的逆矩阵。

&emsp;&emsp;各位同学应该已经知道并不是所有的方针都有逆矩阵。如何来理解这个事实呢？我们尝试从定义出发来解释一下：

&emsp;&emsp;如果$A$存在逆矩阵，则可将其记为$A^{-1}$。它们之间将有如下的关系成立：
$$
AA^{-1}=I
$$
&emsp;&emsp;而在其中，单位矩阵$E$的形态非常得特别，它应该是下面这样：
$$
\begin{bmatrix}
1&0&0&···&0\\
0&1&0&···&0\\
0&0&1&···&0\\
·&·&·&···&0\\
·&·&·&···&0\\
·&·&·&···&1\\
\end{bmatrix}
$$
&emsp;&emsp;实际上，如果你对高中阶段的向量知识比较熟悉的话，这实际上意味着$A$可以作为$n$维空间的一组“基底”。也就是说以$A$中的列向量为已知量，可以表示$n$维空间中的所有向量。再详细些讲，我们根据前部分提到的矩阵乘法的理解方法(1)可以知道，单位矩阵$I$中的每个列向量均是由$A$的列向量线性组合而得到的，其系数即为$A^{-1}$中的列向量。使用单位矩阵中的$n$个列向量可以表示任何的$n$维列向量，而单位矩阵中的n个列向量又均可以由矩阵$A$中的列向量的线性组合表示。这样以来，任何一个$n$维列向量就都可以用$A$中列向量的线性组合进行表示。

&emsp;&emsp;并且，如果你能够回忆起$Lec1$中我们谈到的线性方程组何时有且仅有唯一解问题，会发现这两个问题有些相似，即最终的归宿都是考虑原矩阵的$n$个列向量的线性组合是不是能够完整地表示$n$维空间。

&emsp;&emsp;那么不可逆的矩阵会满足什么条件呢？最简单的方法是直接计算一个矩阵的行列式，如果行列式等于零，那么这个方针必然不可逆。本课程中暂时还没有提及行列式，我们暂且按下不表。除此之外，一个很好的判断方法是：
$$
如果存在非零列向量X满足AX=0,那么矩阵A不可逆
$$
&emsp;&emsp;该如何理解这个条件呢？我们依然用线性组合的思想来考虑。条件说明$A$中的列向量可以通过非零线性组合来表示出零向量。更吸引我们的说法是，存在这样的一个列向量，可以被其它列向量的线性组合表示。第二种表述方法通过移项后调整各个列向量的系数就可以很快得到，但它却更直接的说明了一个问题：$A$的全部列向量同时存在于一个低于$n$维的子空间中。这样以来，完整地表示$n$维空间自然是不可能的。
$$
记A中的列向量为a_1、a_2、...、a_n,X的第i个元素为x_i\\
则有:a_1x_i+a_2x_2+…+a_nx_n=0^\rightarrow\\
移项,调整系数后即:x_i=a_1^`x_i+a_2^`x_2+…+a_{i-1}^`x_{i-1}+a_{i+1}^`x_{i+1}+a_n^`x_n\\
也就说明A中的n个列向量存在于n-1维的子空间中,不可能完整地表示n维空间
$$

## 高斯-若尔当消元法

&emsp;&emsp;高斯消元法我们已经知道，高斯若尔当消元法则是求逆矩阵的一个好方法。我们来介绍一下它的步骤：
$$
已知矩阵A=\begin{bmatrix}
1&3\\
2&7
\end{bmatrix}的逆矩阵A^{-1}存在,试求A^{-1}\\
首先给出原矩阵的增广矩阵:\begin{bmatrix}
1&3&|&1&0\\
2&7&|&0&1
\end{bmatrix}.其中,左侧为原矩阵,右侧为单位矩阵\\
之后对增广矩阵进行行变换,直到左侧矩阵变为单位阵:\\
→\begin{bmatrix}
1&3&|&1&0\\
0&1&|&-2&1
\end{bmatrix}\\
→\begin{bmatrix}
1&0&|&7&-3\\
0&1&|&-2&1
\end{bmatrix}\\
此时,右侧矩阵即为A^{-1}
$$
&emsp;&emsp;这就是高斯-若尔当消元法，对增广矩阵进行行变换直到左侧矩阵为单位阵时，右侧矩阵就为所要求的逆矩阵。

&emsp;&emsp;这个过程的原理实际上是将逆矩阵分解为了若干个初等变换矩阵，我们对增广矩阵进行行初等变换的过程中，实际上每一部都是对左，右侧的矩阵左乘了某个矩阵。也就是将$A^{-1}A=I$分解成了$E_n...E_2E_1A=I$，增广矩阵右侧发生的情况就是$E_n...E_2E_1I=A^{-1}$。解释到这里我们也就知道了必须使用且始终使用行初等变换。我们也可以想到或许竖着的增广矩阵也可以完成这个任务。可以仍旧用上面的例子来检验一下。
$$
A=\begin{bmatrix}
1&3\\
2&7
\end{bmatrix}\\
增广矩阵:A=\begin{bmatrix}
1&3\\
2&7\\
-&-\\
1&0\\
0&1
\end{bmatrix}→\begin{bmatrix}
1&0\\
2&1\\
-&-\\
1&-3\\
0&1
\end{bmatrix}→\begin{bmatrix}
1&0\\
2&1\\
-&-\\
7&-3\\
-2&1
\end{bmatrix}\\
$$
&emsp;&emsp;新得到的逆矩阵依然是相同的，结论得到了验证。
$$
A=\begin{bmatrix}
1&3\\
2&7
\end{bmatrix}\\
增广矩阵:\begin{bmatrix}
1&3&|&1&0\\
2&7&|&0&1
\end{bmatrix}→\begin{bmatrix}
1&3&|&1&0\\
0&1&|&-2&1
\end{bmatrix}\\
→\begin{bmatrix}
1&0&|&7&-3\\
0&1&|&-2&1
\end{bmatrix}\\
$$
