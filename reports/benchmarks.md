# Benchmark Report

> Generated on 2026-09-21 at 12:25:36 UTC
>
> System: linux | Intel(R) Xeon(R) Platinum 8370C CPU @ 2.80GHz (4 cores) | 16GB RAM | Bun 1.4.2

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
| libpdf          |    58.0 |  17.25ms |  24.85ms | ±3.41% |      29 |
| @cantoo/pdf-lib |     4.5 | 219.87ms | 224.54ms | ±0.68% |      10 |
| pdf-lib         |     4.5 | 221.57ms | 243.33ms | ±2.50% |      10 |

- **libpdf** is 12.74x faster than @cantoo/pdf-lib
- **libpdf** is 12.84x faster than pdf-lib

### Create blank PDF

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |   16.6K |  60us |  130us | ±2.55% |   8,319 |
| pdf-lib         |    2.7K | 365us | 1.65ms | ±3.61% |   1,372 |
| @cantoo/pdf-lib |    2.6K | 382us | 1.71ms | ±2.98% |   1,311 |

- **libpdf** is 6.07x faster than pdf-lib
- **libpdf** is 6.35x faster than @cantoo/pdf-lib

### Add 10 pages

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |    8.4K | 120us |  209us | ±1.47% |   4,183 |
| @cantoo/pdf-lib |    2.4K | 424us | 2.23ms | ±3.56% |   1,178 |
| pdf-lib         |    2.1K | 470us | 2.11ms | ±3.46% |   1,063 |

- **libpdf** is 3.55x faster than @cantoo/pdf-lib
- **libpdf** is 3.93x faster than pdf-lib

### Draw 50 rectangles

| Benchmark       | ops/sec |   Mean |    p99 |    RME | Samples |
| :-------------- | ------: | -----: | -----: | -----: | ------: |
| libpdf          |    2.9K |  351us |  987us | ±1.74% |   1,426 |
| pdf-lib         |   605.4 | 1.65ms | 7.94ms | ±9.37% |     303 |
| @cantoo/pdf-lib |   469.9 | 2.13ms | 7.70ms | ±9.38% |     235 |

- **libpdf** is 4.71x faster than pdf-lib
- **libpdf** is 6.07x faster than @cantoo/pdf-lib

### Load and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |    55.1 |  18.14ms |  35.74ms | ±8.39% |      28 |
| pdf-lib         |     3.1 | 317.60ms | 338.33ms | ±1.81% |      10 |
| @cantoo/pdf-lib |     1.6 | 642.97ms | 655.05ms | ±0.88% |      10 |

- **libpdf** is 17.51x faster than pdf-lib
- **libpdf** is 35.45x faster than @cantoo/pdf-lib

### Load, modify, and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| pdf-lib         |     3.2 | 315.23ms | 333.42ms | ±1.57% |      10 |
| libpdf          |     3.0 | 333.82ms | 348.70ms | ±1.55% |      10 |
| @cantoo/pdf-lib |     1.6 | 633.20ms | 643.39ms | ±0.98% |      10 |

- **pdf-lib** is 1.06x faster than libpdf
- **pdf-lib** is 2.01x faster than @cantoo/pdf-lib

### Extract single page from 100-page PDF

| Benchmark       | ops/sec |   Mean |     p99 |    RME | Samples |
| :-------------- | ------: | -----: | ------: | -----: | ------: |
| libpdf          |   303.6 | 3.29ms |  3.97ms | ±0.97% |     152 |
| pdf-lib         |   110.3 | 9.06ms | 11.32ms | ±1.77% |      56 |
| @cantoo/pdf-lib |   103.7 | 9.64ms | 11.70ms | ±2.38% |      52 |

- **libpdf** is 2.75x faster than pdf-lib
- **libpdf** is 2.93x faster than @cantoo/pdf-lib

### Split 100-page PDF into single-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    25.5 | 39.26ms | 42.36ms | ±2.93% |      13 |
| pdf-lib         |    12.8 | 78.19ms | 84.07ms | ±3.69% |       7 |
| @cantoo/pdf-lib |    12.7 | 78.98ms | 87.30ms | ±5.18% |       7 |

- **libpdf** is 1.99x faster than pdf-lib
- **libpdf** is 2.01x faster than @cantoo/pdf-lib

### Split 2000-page PDF into single-page PDFs (0.9MB)

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |     1.4 | 717.93ms | 717.93ms | ±0.00% |       1 |
| pdf-lib         |   0.700 |    1.43s |    1.43s | ±0.00% |       1 |
| @cantoo/pdf-lib |   0.674 |    1.48s |    1.48s | ±0.00% |       1 |

- **libpdf** is 1.99x faster than pdf-lib
- **libpdf** is 2.07x faster than @cantoo/pdf-lib

### Copy 10 pages between documents

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |   234.0 |  4.27ms |  5.11ms | ±1.31% |     117 |
| pdf-lib         |    85.3 | 11.72ms | 12.88ms | ±1.46% |      43 |
| @cantoo/pdf-lib |    73.1 | 13.68ms | 20.80ms | ±3.55% |      37 |

- **libpdf** is 2.74x faster than pdf-lib
- **libpdf** is 3.20x faster than @cantoo/pdf-lib

### Merge 2 x 100-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    67.6 | 14.78ms | 16.14ms | ±1.12% |      34 |
| pdf-lib         |    18.8 | 53.09ms | 54.68ms | ±1.29% |      10 |
| @cantoo/pdf-lib |    16.2 | 61.79ms | 62.68ms | ±0.89% |       9 |

- **libpdf** is 3.59x faster than pdf-lib
- **libpdf** is 4.18x faster than @cantoo/pdf-lib

### Fill FINTRAC form fields

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    48.8 | 20.49ms | 26.42ms | ±3.78% |      25 |
| pdf-lib         |    34.6 | 28.86ms | 38.58ms | ±5.42% |      18 |
| @cantoo/pdf-lib |    34.6 | 28.89ms | 40.12ms | ±6.20% |      18 |

- **libpdf** is 1.41x faster than pdf-lib
- **libpdf** is 1.41x faster than @cantoo/pdf-lib

### Fill and flatten FINTRAC form

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    57.6 | 17.35ms | 20.02ms | ±2.46% |      29 |
| pdf-lib         |  FAILED |       - |       - |      - |       0 |
| @cantoo/pdf-lib |    30.7 | 32.53ms | 48.37ms | ±7.17% |      16 |

- **libpdf** is 1.88x faster than @cantoo/pdf-lib

## Copying

### Copy pages between documents

| Benchmark                       | ops/sec |   Mean |     p99 |    RME | Samples |
| :------------------------------ | ------: | -----: | ------: | -----: | ------: |
| copy 1 page                     |   952.6 | 1.05ms |  2.67ms | ±3.49% |     477 |
| copy 10 pages from 100-page PDF |   227.0 | 4.41ms |  7.99ms | ±2.78% |     114 |
| copy all 100 pages              |   132.5 | 7.55ms | 11.81ms | ±2.23% |      67 |

- **copy 1 page** is 4.20x faster than copy 10 pages from 100-page PDF
- **copy 1 page** is 7.19x faster than copy all 100 pages

### Duplicate pages within same document

| Benchmark                                 | ops/sec |  Mean |    p99 |    RME | Samples |
| :---------------------------------------- | ------: | ----: | -----: | -----: | ------: |
| duplicate all pages (double the document) |    1.1K | 918us | 1.36ms | ±0.83% |     545 |
| duplicate page 0                          |    1.1K | 923us | 1.46ms | ±0.98% |     542 |

- **duplicate all pages (double the document)** is 1.01x faster than duplicate page 0

### Merge PDFs

| Benchmark               | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------------- | ------: | ------: | ------: | -----: | ------: |
| merge 2 small PDFs      |   706.7 |  1.41ms |  2.03ms | ±1.11% |     354 |
| merge 10 small PDFs     |   131.1 |  7.63ms | 11.23ms | ±2.07% |      66 |
| merge 2 x 100-page PDFs |    69.5 | 14.38ms | 20.77ms | ±2.85% |      35 |

- **merge 2 small PDFs** is 5.39x faster than merge 10 small PDFs
- **merge 2 small PDFs** is 10.17x faster than merge 2 x 100-page PDFs

## Drawing

| Benchmark                           | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------- | ------: | -----: | -----: | -----: | ------: |
| draw 100 lines                      |    1.8K |  571us | 1.19ms | ±1.45% |     877 |
| draw 100 rectangles                 |    1.6K |  612us | 1.35ms | ±1.87% |     818 |
| draw 100 circles                    |    1.0K |  965us | 1.94ms | ±1.90% |     519 |
| create 10 pages with mixed content  |   691.4 | 1.45ms | 2.48ms | ±2.00% |     346 |
| draw 100 text lines (standard font) |   629.5 | 1.59ms | 2.69ms | ±2.06% |     315 |

- **draw 100 lines** is 1.07x faster than draw 100 rectangles
- **draw 100 lines** is 1.69x faster than draw 100 circles
- **draw 100 lines** is 2.53x faster than create 10 pages with mixed content
- **draw 100 lines** is 2.78x faster than draw 100 text lines (standard font)

## Forms

| Benchmark         | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------- | ------: | ------: | ------: | -----: | ------: |
| read field values |   375.1 |  2.67ms |  4.90ms | ±2.91% |     188 |
| get form fields   |   353.5 |  2.83ms |  5.44ms | ±2.91% |     177 |
| flatten form      |   131.8 |  7.59ms |  8.52ms | ±1.15% |      66 |
| fill text fields  |    84.7 | 11.81ms | 24.11ms | ±6.45% |      43 |

- **read field values** is 1.06x faster than get form fields
- **read field values** is 2.85x faster than flatten form
- **read field values** is 4.43x faster than fill text fields

## Loading

| Benchmark              | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------- | ------: | ------: | ------: | -----: | ------: |
| load small PDF (888B)  |   18.2K |    55us |   159us | ±3.00% |   9,121 |
| load medium PDF (19KB) |   12.2K |    82us |   108us | ±0.64% |   6,121 |
| load form PDF (116KB)  |   871.2 |  1.15ms |  2.08ms | ±1.63% |     436 |
| load heavy PDF (2.0MB) |    60.3 | 16.58ms | 17.38ms | ±1.35% |      31 |

- **load small PDF (888B)** is 1.49x faster than load medium PDF (19KB)
- **load small PDF (888B)** is 20.94x faster than load form PDF (116KB)
- **load small PDF (888B)** is 302.40x faster than load heavy PDF (2.0MB)

## Saving

| Benchmark                          | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------- | ------: | ------: | ------: | -----: | ------: |
| save unmodified (19KB)             |   10.0K |   100us |   275us | ±2.95% |   5,005 |
| incremental save (19KB)            |    6.7K |   148us |   352us | ±1.16% |   3,372 |
| save with modifications (19KB)     |    1.3K |   749us |  1.38ms | ±1.42% |     668 |
| save heavy PDF (2.0MB)             |    58.2 | 17.17ms | 18.14ms | ±1.47% |      30 |
| incremental save heavy PDF (2.0MB) |    54.2 | 18.46ms | 20.25ms | ±1.49% |      28 |

- **save unmodified (19KB)** is 1.48x faster than incremental save (19KB)
- **save unmodified (19KB)** is 7.49x faster than save with modifications (19KB)
- **save unmodified (19KB)** is 171.86x faster than save heavy PDF (2.0MB)
- **save unmodified (19KB)** is 184.82x faster than incremental save heavy PDF (2.0MB)

## Splitting

### Extract single page

| Benchmark                                | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extractPages (1 page from small PDF)     |   964.8 |  1.04ms |  2.12ms | ±2.99% |     483 |
| extractPages (1 page from 100-page PDF)  |   304.8 |  3.28ms |  3.92ms | ±1.28% |     153 |
| extractPages (1 page from 2000-page PDF) |    18.6 | 53.83ms | 57.31ms | ±2.01% |      10 |

- **extractPages (1 page from small PDF)** is 3.17x faster than extractPages (1 page from 100-page PDF)
- **extractPages (1 page from small PDF)** is 51.94x faster than extractPages (1 page from 2000-page PDF)

### Split into single-page PDFs

| Benchmark                   | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------------------- | ------: | -------: | -------: | -----: | ------: |
| split 100-page PDF (0.1MB)  |    25.6 |  39.11ms |  44.34ms | ±3.64% |      13 |
| split 2000-page PDF (0.9MB) |     1.4 | 706.09ms | 706.09ms | ±0.00% |       1 |

- **split 100-page PDF (0.1MB)** is 18.06x faster than split 2000-page PDF (0.9MB)

### Batch page extraction

| Benchmark                                              | ops/sec |    Mean |     p99 |    RME | Samples |
| :----------------------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extract first 10 pages from 2000-page PDF              |    18.3 | 54.66ms | 56.56ms | ±1.30% |      10 |
| extract first 100 pages from 2000-page PDF             |    16.8 | 59.37ms | 60.59ms | ±1.19% |       9 |
| extract every 10th page from 2000-page PDF (200 pages) |    15.3 | 65.40ms | 70.56ms | ±2.78% |       8 |

- **extract first 10 pages from 2000-page PDF** is 1.09x faster than extract first 100 pages from 2000-page PDF
- **extract first 10 pages from 2000-page PDF** is 1.20x faster than extract every 10th page from 2000-page PDF (200 pages)

---

_Results are machine-dependent. Use for relative comparison only._
