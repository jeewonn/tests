import heapq
def solution(scoville,k):
    heapq.heapify(scoville)
    count = 0
    while scoville:
        first = heapq.heappop(scoville)
        if first >= k: return count
        else:
            if scoville:
                count += 1
                second = heapq.heappop(scoville)
                heapq.heappush(scoville,first+second*2)
            else:
                return -1
