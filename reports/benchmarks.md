# Benchmark Report

> Generated on 2026-07-20 at 09:23:56 UTC
>
> System: linux | AMD EPYC 7763 64-Core Processor (4 cores) | 16GB RAM | Bun 1.3.14

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
| libpdf          |    51.2 |  19.53ms |  37.34ms | ±8.07% |      26 |
| pdf-lib         |     4.6 | 216.61ms | 222.08ms | ±1.29% |      10 |
| @cantoo/pdf-lib |     4.6 | 218.80ms | 224.05ms | ±0.79% |      10 |

- **libpdf** is 11.09x faster than pdf-lib
- **libpdf** is 11.21x faster than @cantoo/pdf-lib

### Create blank PDF

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |   13.8K |  72us |  166us | ±2.42% |   6,906 |
| pdf-lib         |    2.8K | 356us | 1.39ms | ±3.05% |   1,404 |
| @cantoo/pdf-lib |    2.5K | 394us | 1.83ms | ±3.40% |   1,270 |

- **libpdf** is 4.92x faster than pdf-lib
- **libpdf** is 5.44x faster than @cantoo/pdf-lib

### Add 10 pages

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |    8.1K | 124us |  231us | ±1.26% |   4,028 |
| @cantoo/pdf-lib |    2.5K | 403us | 1.98ms | ±3.55% |   1,242 |
| pdf-lib         |    2.1K | 465us | 1.85ms | ±4.98% |   1,075 |

- **libpdf** is 3.24x faster than @cantoo/pdf-lib
- **libpdf** is 3.75x faster than pdf-lib

### Draw 50 rectangles

| Benchmark       | ops/sec |   Mean |    p99 |    RME | Samples |
| :-------------- | ------: | -----: | -----: | -----: | ------: |
| libpdf          |    2.9K |  349us |  833us | ±1.33% |   1,435 |
| pdf-lib         |   688.8 | 1.45ms | 5.60ms | ±7.57% |     346 |
| @cantoo/pdf-lib |   576.4 | 1.73ms | 8.01ms | ±7.03% |     289 |

- **libpdf** is 4.16x faster than pdf-lib
- **libpdf** is 4.98x faster than @cantoo/pdf-lib

### Load and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |    54.5 |  18.33ms |  24.39ms | ±2.92% |      28 |
| pdf-lib         |     3.2 | 310.87ms | 328.83ms | ±1.63% |      10 |
| @cantoo/pdf-lib |     1.6 | 623.56ms | 640.20ms | ±1.25% |      10 |

- **libpdf** is 16.96x faster than pdf-lib
- **libpdf** is 34.01x faster than @cantoo/pdf-lib

### Load, modify, and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| pdf-lib         |     3.3 | 306.27ms | 312.38ms | ±0.84% |      10 |
| libpdf          |     3.0 | 332.54ms | 351.70ms | ±1.89% |      10 |
| @cantoo/pdf-lib |     1.6 | 632.72ms | 649.17ms | ±1.13% |      10 |

- **pdf-lib** is 1.09x faster than libpdf
- **pdf-lib** is 2.07x faster than @cantoo/pdf-lib

### Extract single page from 100-page PDF

| Benchmark       | ops/sec |   Mean |     p99 |    RME | Samples |
| :-------------- | ------: | -----: | ------: | -----: | ------: |
| libpdf          |   281.7 | 3.55ms |  4.05ms | ±0.62% |     141 |
| pdf-lib         |   113.2 | 8.83ms | 10.93ms | ±1.48% |      57 |
| @cantoo/pdf-lib |   108.3 | 9.23ms | 11.62ms | ±1.75% |      55 |

- **libpdf** is 2.49x faster than pdf-lib
- **libpdf** is 2.60x faster than @cantoo/pdf-lib

### Split 100-page PDF into single-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    25.2 | 39.67ms | 44.38ms | ±2.33% |      13 |
| pdf-lib         |    13.0 | 76.66ms | 86.32ms | ±8.17% |       7 |
| @cantoo/pdf-lib |    12.7 | 78.86ms | 82.27ms | ±3.29% |       7 |

- **libpdf** is 1.93x faster than pdf-lib
- **libpdf** is 1.99x faster than @cantoo/pdf-lib

### Split 2000-page PDF into single-page PDFs (0.9MB)

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |     1.4 | 738.16ms | 738.16ms | ±0.00% |       1 |
| pdf-lib         |   0.755 |    1.32s |    1.32s | ±0.00% |       1 |
| @cantoo/pdf-lib |   0.694 |    1.44s |    1.44s | ±0.00% |       1 |

- **libpdf** is 1.79x faster than pdf-lib
- **libpdf** is 1.95x faster than @cantoo/pdf-lib

### Copy 10 pages between documents

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |   219.7 |  4.55ms |  5.08ms | ±0.79% |     110 |
| pdf-lib         |    87.4 | 11.44ms | 13.37ms | ±1.00% |      44 |
| @cantoo/pdf-lib |    77.1 | 12.96ms | 14.37ms | ±1.20% |      39 |

- **libpdf** is 2.51x faster than pdf-lib
- **libpdf** is 2.85x faster than @cantoo/pdf-lib

### Merge 2 x 100-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    65.4 | 15.29ms | 18.14ms | ±1.65% |      33 |
| pdf-lib         |    19.4 | 51.42ms | 53.69ms | ±1.17% |      10 |
| @cantoo/pdf-lib |    16.1 | 61.98ms | 62.68ms | ±0.72% |       9 |

- **libpdf** is 3.36x faster than pdf-lib
- **libpdf** is 4.05x faster than @cantoo/pdf-lib

### Fill FINTRAC form fields

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    47.6 | 21.00ms | 26.82ms | ±3.60% |      24 |
| pdf-lib         |    37.3 | 26.83ms | 37.11ms | ±5.22% |      19 |
| @cantoo/pdf-lib |    36.4 | 27.44ms | 36.14ms | ±4.90% |      19 |

- **libpdf** is 1.28x faster than pdf-lib
- **libpdf** is 1.31x faster than @cantoo/pdf-lib

### Fill and flatten FINTRAC form

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    60.3 | 16.58ms | 19.33ms | ±1.98% |      31 |
| pdf-lib         |  FAILED |       - |       - |      - |       0 |
| @cantoo/pdf-lib |    32.0 | 31.23ms | 44.85ms | ±6.25% |      17 |

- **libpdf** is 1.88x faster than @cantoo/pdf-lib

## Copying

### Copy pages between documents

| Benchmark                       | ops/sec |   Mean |    p99 |    RME | Samples |
| :------------------------------ | ------: | -----: | -----: | -----: | ------: |
| copy 1 page                     |   872.7 | 1.15ms | 2.83ms | ±3.23% |     437 |
| copy 10 pages from 100-page PDF |   216.2 | 4.63ms | 6.46ms | ±1.55% |     109 |
| copy all 100 pages              |   129.0 | 7.75ms | 9.47ms | ±1.05% |      65 |

- **copy 1 page** is 4.04x faster than copy 10 pages from 100-page PDF
- **copy 1 page** is 6.77x faster than copy all 100 pages

### Duplicate pages within same document

| Benchmark                                 | ops/sec |  Mean |    p99 |    RME | Samples |
| :---------------------------------------- | ------: | ----: | -----: | -----: | ------: |
| duplicate all pages (double the document) |    1.0K | 994us | 1.26ms | ±0.57% |     504 |
| duplicate page 0                          |    1.0K | 999us | 1.34ms | ±0.70% |     501 |

- **duplicate all pages (double the document)** is 1.01x faster than duplicate page 0

### Merge PDFs

| Benchmark               | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------------- | ------: | ------: | ------: | -----: | ------: |
| merge 2 small PDFs      |   643.7 |  1.55ms |  1.95ms | ±0.90% |     322 |
| merge 10 small PDFs     |   124.5 |  8.03ms | 12.24ms | ±2.10% |      63 |
| merge 2 x 100-page PDFs |    68.6 | 14.58ms | 18.26ms | ±1.66% |      35 |

- **merge 2 small PDFs** is 5.17x faster than merge 10 small PDFs
- **merge 2 small PDFs** is 9.39x faster than merge 2 x 100-page PDFs

## Drawing

| Benchmark                           | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------- | ------: | -----: | -----: | -----: | ------: |
| draw 100 lines                      |    1.8K |  552us | 1.09ms | ±1.12% |     907 |
| draw 100 rectangles                 |    1.6K |  643us | 1.75ms | ±2.99% |     778 |
| draw 100 circles                    |    1.1K |  902us | 1.75ms | ±1.49% |     555 |
| create 10 pages with mixed content  |   684.8 | 1.46ms | 2.84ms | ±2.25% |     343 |
| draw 100 text lines (standard font) |   630.7 | 1.59ms | 2.99ms | ±1.88% |     316 |

- **draw 100 lines** is 1.17x faster than draw 100 rectangles
- **draw 100 lines** is 1.63x faster than draw 100 circles
- **draw 100 lines** is 2.65x faster than create 10 pages with mixed content
- **draw 100 lines** is 2.87x faster than draw 100 text lines (standard font)

## Forms

| Benchmark         | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------- | ------: | ------: | ------: | -----: | ------: |
| read field values |   340.7 |  2.93ms |  5.75ms | ±2.03% |     171 |
| get form fields   |   299.9 |  3.33ms |  7.26ms | ±4.28% |     150 |
| flatten form      |   124.2 |  8.05ms | 10.06ms | ±1.17% |      63 |
| fill text fields  |    79.4 | 12.59ms | 17.02ms | ±3.94% |      40 |

- **read field values** is 1.14x faster than get form fields
- **read field values** is 2.74x faster than flatten form
- **read field values** is 4.29x faster than fill text fields

## Loading

| Benchmark              | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------- | ------: | ------: | ------: | -----: | ------: |
| load small PDF (888B)  |   16.2K |    62us |   189us | ±0.96% |   8,102 |
| load medium PDF (19KB) |   11.0K |    91us |   173us | ±0.51% |   5,507 |
| load form PDF (116KB)  |   795.6 |  1.26ms |  2.43ms | ±1.83% |     398 |
| load heavy PDF (2.0MB) |    57.5 | 17.40ms | 18.43ms | ±1.34% |      29 |

- **load small PDF (888B)** is 1.47x faster than load medium PDF (19KB)
- **load small PDF (888B)** is 20.36x faster than load form PDF (116KB)
- **load small PDF (888B)** is 281.95x faster than load heavy PDF (2.0MB)

## Saving

| Benchmark                          | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------- | ------: | ------: | ------: | -----: | ------: |
| save unmodified (19KB)             |    9.1K |   110us |   342us | ±1.20% |   4,537 |
| incremental save (19KB)            |    5.7K |   177us |   386us | ±1.21% |   2,826 |
| save with modifications (19KB)     |    1.2K |   856us |  1.62ms | ±1.73% |     584 |
| save heavy PDF (2.0MB)             |    55.1 | 18.15ms | 19.65ms | ±1.05% |      28 |
| incremental save heavy PDF (2.0MB) |    52.0 | 19.23ms | 22.19ms | ±1.77% |      26 |

- **save unmodified (19KB)** is 1.61x faster than incremental save (19KB)
- **save unmodified (19KB)** is 7.77x faster than save with modifications (19KB)
- **save unmodified (19KB)** is 164.73x faster than save heavy PDF (2.0MB)
- **save unmodified (19KB)** is 174.50x faster than incremental save heavy PDF (2.0MB)

## Splitting

### Extract single page

| Benchmark                                | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extractPages (1 page from small PDF)     |   879.9 |  1.14ms |  2.84ms | ±3.24% |     440 |
| extractPages (1 page from 100-page PDF)  |   285.1 |  3.51ms |  4.21ms | ±1.16% |     143 |
| extractPages (1 page from 2000-page PDF) |    18.4 | 54.31ms | 55.16ms | ±0.58% |      10 |

- **extractPages (1 page from small PDF)** is 3.09x faster than extractPages (1 page from 100-page PDF)
- **extractPages (1 page from small PDF)** is 47.79x faster than extractPages (1 page from 2000-page PDF)

### Split into single-page PDFs

| Benchmark                   | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------------------- | ------: | -------: | -------: | -----: | ------: |
| split 100-page PDF (0.1MB)  |    24.8 |  40.38ms |  43.99ms | ±2.18% |      13 |
| split 2000-page PDF (0.9MB) |     1.4 | 726.87ms | 726.87ms | ±0.00% |       1 |

- **split 100-page PDF (0.1MB)** is 18.00x faster than split 2000-page PDF (0.9MB)

### Batch page extraction

| Benchmark                                              | ops/sec |    Mean |     p99 |    RME | Samples |
| :----------------------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extract first 10 pages from 2000-page PDF              |    18.0 | 55.71ms | 57.46ms | ±1.26% |       9 |
| extract first 100 pages from 2000-page PDF             |    16.9 | 59.20ms | 60.37ms | ±1.13% |       9 |
| extract every 10th page from 2000-page PDF (200 pages) |    15.6 | 63.92ms | 65.45ms | ±0.93% |       8 |

- **extract first 10 pages from 2000-page PDF** is 1.06x faster than extract first 100 pages from 2000-page PDF
- **extract first 10 pages from 2000-page PDF** is 1.15x faster than extract every 10th page from 2000-page PDF (200 pages)

---

_Results are machine-dependent. Use for relative comparison only._
