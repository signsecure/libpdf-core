# Benchmark Report

> Generated on 2026-11-09 at 15:42:09 UTC
>
> System: linux | INTEL(R) XEON(R) PLATINUM 8573C (4 cores) | 16GB RAM | Bun 1.4.4

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
| libpdf          |    51.3 |  19.48ms |  23.29ms | ±2.63% |      26 |
| @cantoo/pdf-lib |     4.7 | 213.63ms | 215.31ms | ±0.34% |      10 |
| pdf-lib         |     4.7 | 214.39ms | 222.99ms | ±1.15% |      10 |

- **libpdf** is 10.97x faster than @cantoo/pdf-lib
- **libpdf** is 11.01x faster than pdf-lib

### Create blank PDF

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |   14.3K |  70us |  141us | ±3.74% |   7,148 |
| pdf-lib         |    2.9K | 350us | 1.81ms | ±4.24% |   1,428 |
| @cantoo/pdf-lib |    2.8K | 357us | 1.91ms | ±4.00% |   1,400 |

- **libpdf** is 5.01x faster than pdf-lib
- **libpdf** is 5.11x faster than @cantoo/pdf-lib

### Add 10 pages

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |    9.1K | 110us |  204us | ±1.55% |   4,564 |
| @cantoo/pdf-lib |    2.6K | 383us | 2.45ms | ±4.27% |   1,308 |
| pdf-lib         |    2.4K | 417us | 2.25ms | ±4.43% |   1,199 |

- **libpdf** is 3.49x faster than @cantoo/pdf-lib
- **libpdf** is 3.81x faster than pdf-lib

### Draw 50 rectangles

| Benchmark       | ops/sec |   Mean |    p99 |    RME | Samples |
| :-------------- | ------: | -----: | -----: | -----: | ------: |
| libpdf          |    3.1K |  318us |  915us | ±1.73% |   1,575 |
| pdf-lib         |   749.4 | 1.33ms | 5.70ms | ±6.89% |     375 |
| @cantoo/pdf-lib |   619.5 | 1.61ms | 4.62ms | ±6.94% |     312 |

- **libpdf** is 4.20x faster than pdf-lib
- **libpdf** is 5.08x faster than @cantoo/pdf-lib

### Load and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |    52.4 |  19.08ms |  21.52ms | ±1.92% |      27 |
| pdf-lib         |     3.2 | 308.92ms | 326.46ms | ±1.70% |      10 |
| @cantoo/pdf-lib |     1.9 | 539.35ms | 576.63ms | ±2.21% |      10 |

- **libpdf** is 16.20x faster than pdf-lib
- **libpdf** is 28.28x faster than @cantoo/pdf-lib

### Load, modify, and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| pdf-lib         |     3.2 | 309.25ms | 320.42ms | ±1.32% |      10 |
| libpdf          |     3.0 | 329.95ms | 341.76ms | ±1.30% |      10 |
| @cantoo/pdf-lib |     1.9 | 529.42ms | 565.12ms | ±1.94% |      10 |

- **pdf-lib** is 1.07x faster than libpdf
- **pdf-lib** is 1.71x faster than @cantoo/pdf-lib

### Extract single page from 100-page PDF

| Benchmark       | ops/sec |   Mean |     p99 |    RME | Samples |
| :-------------- | ------: | -----: | ------: | -----: | ------: |
| libpdf          |   311.6 | 3.21ms |  4.08ms | ±1.20% |     156 |
| pdf-lib         |   116.3 | 8.60ms | 10.63ms | ±1.65% |      59 |
| @cantoo/pdf-lib |   109.9 | 9.10ms | 11.18ms | ±1.98% |      56 |

- **libpdf** is 2.68x faster than pdf-lib
- **libpdf** is 2.83x faster than @cantoo/pdf-lib

### Split 100-page PDF into single-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    30.0 | 33.30ms | 33.96ms | ±0.92% |      16 |
| pdf-lib         |    14.2 | 70.57ms | 78.17ms | ±5.80% |       8 |
| @cantoo/pdf-lib |    13.4 | 74.57ms | 81.21ms | ±5.32% |       7 |

- **libpdf** is 2.12x faster than pdf-lib
- **libpdf** is 2.24x faster than @cantoo/pdf-lib

### Split 2000-page PDF into single-page PDFs (0.9MB)

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |     1.6 | 643.55ms | 643.55ms | ±0.00% |       1 |
| pdf-lib         |   0.764 |    1.31s |    1.31s | ±0.00% |       1 |
| @cantoo/pdf-lib |   0.726 |    1.38s |    1.38s | ±0.00% |       1 |

- **libpdf** is 2.03x faster than pdf-lib
- **libpdf** is 2.14x faster than @cantoo/pdf-lib

### Copy 10 pages between documents

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |   246.1 |  4.06ms |  5.01ms | ±1.50% |     124 |
| pdf-lib         |    88.5 | 11.30ms | 12.85ms | ±1.55% |      45 |
| @cantoo/pdf-lib |    76.3 | 13.11ms | 21.61ms | ±4.18% |      39 |

- **libpdf** is 2.78x faster than pdf-lib
- **libpdf** is 3.23x faster than @cantoo/pdf-lib

### Merge 2 x 100-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    72.2 | 13.85ms | 15.11ms | ±1.19% |      37 |
| pdf-lib         |    19.5 | 51.21ms | 52.14ms | ±0.82% |      10 |
| @cantoo/pdf-lib |    16.6 | 60.24ms | 60.85ms | ±0.72% |       9 |

- **libpdf** is 3.70x faster than pdf-lib
- **libpdf** is 4.35x faster than @cantoo/pdf-lib

### Fill FINTRAC form fields

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    49.5 | 20.21ms | 25.75ms | ±3.37% |      25 |
| @cantoo/pdf-lib |    36.3 | 27.53ms | 39.03ms | ±5.95% |      19 |
| pdf-lib         |    35.8 | 27.96ms | 35.25ms | ±4.99% |      18 |

- **libpdf** is 1.36x faster than @cantoo/pdf-lib
- **libpdf** is 1.38x faster than pdf-lib

### Fill and flatten FINTRAC form

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    59.2 | 16.90ms | 21.03ms | ±3.42% |      30 |
| pdf-lib         |  FAILED |       - |       - |      - |       0 |
| @cantoo/pdf-lib |    31.7 | 31.59ms | 43.84ms | ±5.78% |      16 |

- **libpdf** is 1.87x faster than @cantoo/pdf-lib

## Copying

### Copy pages between documents

| Benchmark                       | ops/sec |   Mean |    p99 |    RME | Samples |
| :------------------------------ | ------: | -----: | -----: | -----: | ------: |
| copy 1 page                     |    1.1K |  941us | 1.91ms | ±2.43% |     532 |
| copy 10 pages from 100-page PDF |   253.3 | 3.95ms | 6.01ms | ±1.83% |     127 |
| copy all 100 pages              |   147.6 | 6.77ms | 7.26ms | ±0.84% |      74 |

- **copy 1 page** is 4.20x faster than copy 10 pages from 100-page PDF
- **copy 1 page** is 7.20x faster than copy all 100 pages

### Duplicate pages within same document

| Benchmark                                 | ops/sec |  Mean |    p99 |    RME | Samples |
| :---------------------------------------- | ------: | ----: | -----: | -----: | ------: |
| duplicate page 0                          |    1.2K | 854us | 1.37ms | ±1.00% |     586 |
| duplicate all pages (double the document) |    1.2K | 855us | 1.33ms | ±1.02% |     585 |

- **duplicate page 0** is 1.00x faster than duplicate all pages (double the document)

### Merge PDFs

| Benchmark               | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------------- | ------: | ------: | ------: | -----: | ------: |
| merge 2 small PDFs      |   753.3 |  1.33ms |  2.40ms | ±1.37% |     377 |
| merge 10 small PDFs     |   142.4 |  7.02ms | 10.41ms | ±2.45% |      72 |
| merge 2 x 100-page PDFs |    77.8 | 12.86ms | 15.42ms | ±1.44% |      39 |

- **merge 2 small PDFs** is 5.29x faster than merge 10 small PDFs
- **merge 2 small PDFs** is 9.69x faster than merge 2 x 100-page PDFs

## Drawing

| Benchmark                           | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------- | ------: | -----: | -----: | -----: | ------: |
| draw 100 lines                      |    1.9K |  530us | 1.18ms | ±1.70% |     944 |
| draw 100 rectangles                 |    1.7K |  587us | 1.39ms | ±2.24% |     852 |
| draw 100 circles                    |    1.1K |  896us | 1.91ms | ±2.03% |     559 |
| create 10 pages with mixed content  |   757.9 | 1.32ms | 2.25ms | ±1.88% |     379 |
| draw 100 text lines (standard font) |   681.7 | 1.47ms | 2.61ms | ±1.95% |     341 |

- **draw 100 lines** is 1.11x faster than draw 100 rectangles
- **draw 100 lines** is 1.69x faster than draw 100 circles
- **draw 100 lines** is 2.49x faster than create 10 pages with mixed content
- **draw 100 lines** is 2.77x faster than draw 100 text lines (standard font)

## Forms

| Benchmark         | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------- | ------: | ------: | ------: | -----: | ------: |
| read field values |   388.5 |  2.57ms |  4.36ms | ±1.61% |     195 |
| get form fields   |   338.9 |  2.95ms |  5.59ms | ±4.03% |     170 |
| flatten form      |   130.4 |  7.67ms |  9.35ms | ±1.73% |      66 |
| fill text fields  |    89.2 | 11.21ms | 16.66ms | ±4.48% |      45 |

- **read field values** is 1.15x faster than get form fields
- **read field values** is 2.98x faster than flatten form
- **read field values** is 4.36x faster than fill text fields

## Loading

| Benchmark              | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------- | ------: | ------: | ------: | -----: | ------: |
| load small PDF (888B)  |   20.5K |    49us |   154us | ±2.33% |  10,233 |
| load medium PDF (19KB) |   13.7K |    73us |   126us | ±0.70% |   6,874 |
| load form PDF (116KB)  |   913.1 |  1.10ms |  2.03ms | ±1.55% |     457 |
| load heavy PDF (2.0MB) |    62.6 | 15.97ms | 17.37ms | ±1.64% |      32 |

- **load small PDF (888B)** is 1.49x faster than load medium PDF (19KB)
- **load small PDF (888B)** is 22.41x faster than load form PDF (116KB)
- **load small PDF (888B)** is 326.79x faster than load heavy PDF (2.0MB)

## Saving

| Benchmark                          | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------- | ------: | ------: | ------: | -----: | ------: |
| save unmodified (19KB)             |   11.5K |    87us |   212us | ±2.06% |   5,752 |
| incremental save (19KB)            |    7.7K |   130us |   311us | ±1.25% |   3,858 |
| save with modifications (19KB)     |    1.5K |   689us |  1.30ms | ±1.68% |     727 |
| save heavy PDF (2.0MB)             |    59.3 | 16.87ms | 18.50ms | ±1.17% |      30 |
| incremental save heavy PDF (2.0MB) |    54.4 | 18.38ms | 20.32ms | ±1.15% |      28 |

- **save unmodified (19KB)** is 1.49x faster than incremental save (19KB)
- **save unmodified (19KB)** is 7.92x faster than save with modifications (19KB)
- **save unmodified (19KB)** is 194.07x faster than save heavy PDF (2.0MB)
- **save unmodified (19KB)** is 211.39x faster than incremental save heavy PDF (2.0MB)

## Splitting

### Extract single page

| Benchmark                                | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extractPages (1 page from small PDF)     |    1.0K |   979us |  2.47ms | ±3.56% |     511 |
| extractPages (1 page from 100-page PDF)  |   325.3 |  3.07ms |  5.25ms | ±1.75% |     163 |
| extractPages (1 page from 2000-page PDF) |    19.1 | 52.42ms | 55.92ms | ±3.01% |      10 |

- **extractPages (1 page from small PDF)** is 3.14x faster than extractPages (1 page from 100-page PDF)
- **extractPages (1 page from small PDF)** is 53.56x faster than extractPages (1 page from 2000-page PDF)

### Split into single-page PDFs

| Benchmark                   | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------------------- | ------: | -------: | -------: | -----: | ------: |
| split 100-page PDF (0.1MB)  |    29.5 |  33.91ms |  37.58ms | ±2.38% |      15 |
| split 2000-page PDF (0.9MB) |     1.6 | 626.35ms | 626.35ms | ±0.00% |       1 |

- **split 100-page PDF (0.1MB)** is 18.47x faster than split 2000-page PDF (0.9MB)

### Batch page extraction

| Benchmark                                              | ops/sec |    Mean |     p99 |    RME | Samples |
| :----------------------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extract first 10 pages from 2000-page PDF              |    19.7 | 50.68ms | 53.12ms | ±1.34% |      10 |
| extract first 100 pages from 2000-page PDF             |    18.2 | 55.09ms | 56.30ms | ±1.65% |      10 |
| extract every 10th page from 2000-page PDF (200 pages) |    16.8 | 59.46ms | 60.19ms | ±0.50% |       9 |

- **extract first 10 pages from 2000-page PDF** is 1.09x faster than extract first 100 pages from 2000-page PDF
- **extract first 10 pages from 2000-page PDF** is 1.17x faster than extract every 10th page from 2000-page PDF (200 pages)

---

_Results are machine-dependent. Use for relative comparison only._
