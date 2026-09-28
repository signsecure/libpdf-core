# Benchmark Report

> Generated on 2026-09-28 at 13:22:49 UTC
>
> System: linux | AMD EPYC 7763 64-Core Processor (4 cores) | 16GB RAM | Bun 1.4.2

---

## Contents

- [Comparison](#comparison)
- [Copying](#copying)
- [Drawing](#drawing)
- [Forms](#forms)
- [Loading](#loading)
- [Saving](#saving)
- [Splitting](#splitting)

## Comparison

### Load PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |    52.2 |  19.15ms |  24.53ms | ±2.83% |      27 |
| pdf-lib         |     4.4 | 228.83ms | 232.58ms | ±0.96% |      10 |
| @cantoo/pdf-lib |     4.4 | 229.49ms | 240.73ms | ±1.80% |      10 |

- **libpdf** is 11.95x faster than pdf-lib
- **libpdf** is 11.99x faster than @cantoo/pdf-lib

### Create blank PDF

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |   14.3K |  70us |  161us | ±2.23% |   7,128 |
| pdf-lib         |    2.9K | 340us | 1.46ms | ±2.61% |   1,472 |
| @cantoo/pdf-lib |    2.7K | 367us | 1.64ms | ±2.87% |   1,364 |

- **libpdf** is 4.84x faster than pdf-lib
- **libpdf** is 5.23x faster than @cantoo/pdf-lib

### Add 10 pages

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |    7.9K | 126us |  264us | ±1.32% |   3,958 |
| @cantoo/pdf-lib |    2.3K | 427us | 2.59ms | ±4.83% |   1,170 |
| pdf-lib         |    2.3K | 436us | 2.02ms | ±3.52% |   1,147 |

- **libpdf** is 3.38x faster than @cantoo/pdf-lib
- **libpdf** is 3.45x faster than pdf-lib

### Draw 50 rectangles

| Benchmark       | ops/sec |   Mean |    p99 |    RME | Samples |
| :-------------- | ------: | -----: | -----: | -----: | ------: |
| libpdf          |    2.8K |  363us | 1.01ms | ±1.78% |   1,378 |
| pdf-lib         |   710.5 | 1.41ms | 5.16ms | ±7.02% |     356 |
| @cantoo/pdf-lib |   601.3 | 1.66ms | 4.24ms | ±5.75% |     301 |

- **libpdf** is 3.88x faster than pdf-lib
- **libpdf** is 4.58x faster than @cantoo/pdf-lib

### Load and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |    52.2 |  19.15ms |  22.47ms | ±2.55% |      27 |
| pdf-lib         |     3.1 | 324.84ms | 336.85ms | ±1.46% |      10 |
| @cantoo/pdf-lib |     1.6 | 623.29ms | 641.05ms | ±1.19% |      10 |

- **libpdf** is 16.96x faster than pdf-lib
- **libpdf** is 32.55x faster than @cantoo/pdf-lib

### Load, modify, and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| pdf-lib         |     3.1 | 325.56ms | 333.56ms | ±1.02% |      10 |
| libpdf          |     2.8 | 357.09ms | 369.96ms | ±1.44% |      10 |
| @cantoo/pdf-lib |     1.6 | 624.30ms | 644.73ms | ±1.09% |      10 |

- **pdf-lib** is 1.10x faster than libpdf
- **pdf-lib** is 1.92x faster than @cantoo/pdf-lib

### Extract single page from 100-page PDF

| Benchmark       | ops/sec |   Mean |     p99 |    RME | Samples |
| :-------------- | ------: | -----: | ------: | -----: | ------: |
| libpdf          |   264.9 | 3.78ms |  4.76ms | ±1.24% |     133 |
| pdf-lib         |   111.3 | 8.99ms |  9.98ms | ±1.66% |      56 |
| @cantoo/pdf-lib |   106.0 | 9.44ms | 11.56ms | ±2.20% |      53 |

- **libpdf** is 2.38x faster than pdf-lib
- **libpdf** is 2.50x faster than @cantoo/pdf-lib

### Split 100-page PDF into single-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    23.8 | 42.09ms | 46.88ms | ±3.33% |      12 |
| pdf-lib         |    13.4 | 74.39ms | 77.69ms | ±2.75% |       7 |
| @cantoo/pdf-lib |    13.0 | 77.21ms | 82.81ms | ±4.22% |       7 |

- **libpdf** is 1.77x faster than pdf-lib
- **libpdf** is 1.83x faster than @cantoo/pdf-lib

### Split 2000-page PDF into single-page PDFs (0.9MB)

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |     1.3 | 756.80ms | 756.80ms | ±0.00% |       1 |
| pdf-lib         |   0.746 |    1.34s |    1.34s | ±0.00% |       1 |
| @cantoo/pdf-lib |   0.707 |    1.41s |    1.41s | ±0.00% |       1 |

- **libpdf** is 1.77x faster than pdf-lib
- **libpdf** is 1.87x faster than @cantoo/pdf-lib

### Copy 10 pages between documents

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |   211.6 |  4.73ms |  5.67ms | ±1.12% |     106 |
| pdf-lib         |    86.4 | 11.58ms | 13.08ms | ±1.39% |      44 |
| @cantoo/pdf-lib |    75.9 | 13.18ms | 14.55ms | ±1.58% |      38 |

- **libpdf** is 2.45x faster than pdf-lib
- **libpdf** is 2.79x faster than @cantoo/pdf-lib

### Merge 2 x 100-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    62.9 | 15.91ms | 16.77ms | ±0.93% |      32 |
| pdf-lib         |    19.0 | 52.60ms | 54.00ms | ±1.32% |      10 |
| @cantoo/pdf-lib |    16.0 | 62.35ms | 63.87ms | ±0.86% |       9 |

- **libpdf** is 3.31x faster than pdf-lib
- **libpdf** is 3.92x faster than @cantoo/pdf-lib

### Fill FINTRAC form fields

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    47.9 | 20.88ms | 26.02ms | ±3.55% |      24 |
| pdf-lib         |    37.1 | 26.93ms | 34.70ms | ±4.65% |      19 |
| @cantoo/pdf-lib |    36.9 | 27.09ms | 39.36ms | ±5.86% |      19 |

- **libpdf** is 1.29x faster than pdf-lib
- **libpdf** is 1.30x faster than @cantoo/pdf-lib

### Fill and flatten FINTRAC form

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    57.3 | 17.45ms | 20.14ms | ±2.42% |      29 |
| pdf-lib         |  FAILED |       - |       - |      - |       0 |
| @cantoo/pdf-lib |    32.1 | 31.14ms | 43.05ms | ±5.63% |      17 |

- **libpdf** is 1.79x faster than @cantoo/pdf-lib

## Copying

### Copy pages between documents

| Benchmark                       | ops/sec |   Mean |    p99 |    RME | Samples |
| :------------------------------ | ------: | -----: | -----: | -----: | ------: |
| copy 1 page                     |   876.7 | 1.14ms | 2.92ms | ±3.14% |     439 |
| copy 10 pages from 100-page PDF |   216.0 | 4.63ms | 6.10ms | ±1.25% |     109 |
| copy all 100 pages              |   126.5 | 7.91ms | 9.94ms | ±1.00% |      64 |

- **copy 1 page** is 4.06x faster than copy 10 pages from 100-page PDF
- **copy 1 page** is 6.93x faster than copy all 100 pages

### Duplicate pages within same document

| Benchmark                                 | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------------- | ------: | -----: | -----: | -----: | ------: |
| duplicate all pages (double the document) |   999.7 | 1.00ms | 1.31ms | ±0.65% |     500 |
| duplicate page 0                          |   987.3 | 1.01ms | 1.44ms | ±0.78% |     494 |

- **duplicate all pages (double the document)** is 1.01x faster than duplicate page 0

### Merge PDFs

| Benchmark               | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------------- | ------: | ------: | ------: | -----: | ------: |
| merge 2 small PDFs      |   635.8 |  1.57ms |  1.97ms | ±1.11% |     318 |
| merge 10 small PDFs     |   120.5 |  8.30ms | 12.48ms | ±2.81% |      61 |
| merge 2 x 100-page PDFs |    66.9 | 14.95ms | 17.09ms | ±1.28% |      34 |

- **merge 2 small PDFs** is 5.28x faster than merge 10 small PDFs
- **merge 2 small PDFs** is 9.50x faster than merge 2 x 100-page PDFs

## Drawing

| Benchmark                           | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------- | ------: | -----: | -----: | -----: | ------: |
| draw 100 lines                      |    1.7K |  573us | 1.21ms | ±1.27% |     873 |
| draw 100 rectangles                 |    1.5K |  652us | 1.89ms | ±3.07% |     768 |
| draw 100 circles                    |    1.1K |  941us | 1.79ms | ±1.66% |     532 |
| create 10 pages with mixed content  |   669.5 | 1.49ms | 2.75ms | ±2.11% |     335 |
| draw 100 text lines (standard font) |   620.4 | 1.61ms | 2.91ms | ±1.73% |     311 |

- **draw 100 lines** is 1.14x faster than draw 100 rectangles
- **draw 100 lines** is 1.64x faster than draw 100 circles
- **draw 100 lines** is 2.61x faster than create 10 pages with mixed content
- **draw 100 lines** is 2.81x faster than draw 100 text lines (standard font)

## Forms

| Benchmark         | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------- | ------: | ------: | ------: | -----: | ------: |
| read field values |   348.9 |  2.87ms |  5.44ms | ±2.40% |     175 |
| get form fields   |   304.5 |  3.28ms |  7.77ms | ±4.82% |     153 |
| flatten form      |   125.2 |  7.99ms | 10.54ms | ±1.45% |      63 |
| fill text fields  |    81.3 | 12.29ms | 15.93ms | ±3.71% |      41 |

- **read field values** is 1.15x faster than get form fields
- **read field values** is 2.79x faster than flatten form
- **read field values** is 4.29x faster than fill text fields

## Loading

| Benchmark              | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------- | ------: | ------: | ------: | -----: | ------: |
| load small PDF (888B)  |   16.2K |    62us |   168us | ±1.46% |   8,103 |
| load medium PDF (19KB) |   11.0K |    91us |   125us | ±0.45% |   5,505 |
| load form PDF (116KB)  |   784.4 |  1.27ms |  2.36ms | ±1.50% |     393 |
| load heavy PDF (2.0MB) |    56.5 | 17.70ms | 18.79ms | ±1.07% |      29 |

- **load small PDF (888B)** is 1.47x faster than load medium PDF (19KB)
- **load small PDF (888B)** is 20.66x faster than load form PDF (116KB)
- **load small PDF (888B)** is 286.87x faster than load heavy PDF (2.0MB)

## Saving

| Benchmark                          | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------- | ------: | ------: | ------: | -----: | ------: |
| save unmodified (19KB)             |    8.5K |   117us |   344us | ±5.40% |   4,264 |
| incremental save (19KB)            |    5.7K |   175us |   371us | ±1.23% |   2,856 |
| save with modifications (19KB)     |    1.2K |   848us |  1.63ms | ±1.86% |     590 |
| save heavy PDF (2.0MB)             |    55.3 | 18.07ms | 19.08ms | ±1.46% |      28 |
| incremental save heavy PDF (2.0MB) |    52.6 | 19.03ms | 20.05ms | ±1.27% |      27 |

- **save unmodified (19KB)** is 1.49x faster than incremental save (19KB)
- **save unmodified (19KB)** is 7.24x faster than save with modifications (19KB)
- **save unmodified (19KB)** is 154.14x faster than save heavy PDF (2.0MB)
- **save unmodified (19KB)** is 162.25x faster than incremental save heavy PDF (2.0MB)

## Splitting

### Extract single page

| Benchmark                                | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extractPages (1 page from small PDF)     |   911.1 |  1.10ms |  2.29ms | ±2.53% |     456 |
| extractPages (1 page from 100-page PDF)  |   274.0 |  3.65ms |  6.05ms | ±1.77% |     137 |
| extractPages (1 page from 2000-page PDF) |    17.5 | 57.08ms | 57.66ms | ±0.50% |      10 |

- **extractPages (1 page from small PDF)** is 3.33x faster than extractPages (1 page from 100-page PDF)
- **extractPages (1 page from small PDF)** is 52.01x faster than extractPages (1 page from 2000-page PDF)

### Split into single-page PDFs

| Benchmark                   | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------------------- | ------: | -------: | -------: | -----: | ------: |
| split 100-page PDF (0.1MB)  |    24.5 |  40.74ms |  46.22ms | ±3.26% |      13 |
| split 2000-page PDF (0.9MB) |     1.4 | 735.70ms | 735.70ms | ±0.00% |       1 |

- **split 100-page PDF (0.1MB)** is 18.06x faster than split 2000-page PDF (0.9MB)

### Batch page extraction

| Benchmark                                              | ops/sec |    Mean |     p99 |    RME | Samples |
| :----------------------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extract first 10 pages from 2000-page PDF              |    17.4 | 57.41ms | 58.24ms | ±0.62% |       9 |
| extract first 100 pages from 2000-page PDF             |    16.1 | 61.95ms | 63.66ms | ±1.37% |       9 |
| extract every 10th page from 2000-page PDF (200 pages) |    14.8 | 67.66ms | 71.36ms | ±2.50% |       8 |

- **extract first 10 pages from 2000-page PDF** is 1.08x faster than extract first 100 pages from 2000-page PDF
- **extract first 10 pages from 2000-page PDF** is 1.18x faster than extract every 10th page from 2000-page PDF (200 pages)

---

_Results are machine-dependent. Use for relative comparison only._
