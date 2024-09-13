import Problem from '../models/problemModel.mjs'; // Adjust the import based on your project structure

export const getProblemList = async (
    searchTerm,
    filterMetrics,
    sort,
    page,
    limit
) => {
    const filter = {};

    if (searchTerm) {
        filter.title = new RegExp(searchTerm, "i");
    }

    if (filterMetrics?.difficulty && filterMetrics.difficulty.length > 0) {
        filter.difficulty = { $in: filterMetrics.difficulty.map(d => new RegExp(d, "i")) };
    }

    if(filterMetrics?.algorithm && filterMetrics.algorithm.length > 0 ) {
        filter.algorithm = { $in: filterMetrics.algorithm.map(d => new RegExp(d, "i")) };
    }

    if(filterMetrics?.dataStructure && filterMetrics.dataStructure.length > 0 ) {
        filter.dataStructures = { $in: filterMetrics.dataStructure.map(d => new RegExp(d, "i")) };
    }


    try {
        const total = Math.ceil((await Problem.countDocuments(filter)) / limit);

        let sortOption = {};
        switch (sort) {
            case 'ALPHABETICAL_ASC':
                sortOption = { title: 1 };
                break;
            case 'ALPHABETICAL_DESC':
                sortOption = { title: -1 };
                break;
            case 'DATE_ADDED_ASC':
                sortOption = { createdAt: -1 };
                break;
            case 'DATE_ADDED_DESC':
                sortOption = { createdAt: 1 };
                break;
            case 'DIFFICULTY_ASC':
                sortOption = { difficulty: 1 };
                break;
            case 'DIFFICULTY_DESC':
                sortOption = { difficulty: -1 };
                break;
            default:
                sortOption = { createdAt: -1 };
        }

        const skip = (page - 1) * limit;

        const problems = await Problem.find(filter, null, {
            skip,
            limit,
            sort: sortOption
        });

        return { 
            statusCode: 200, 
            searchData: { 
                problems, 
                totalPages: total, 
                searchOptions: { difficultyOptions, sortOptions, filterOptions }, 
                searchMetrics: { searchTerm, filterMetrics, sort, page, limit } 
            } 
        };
    } catch (error) {
        console.error("Error getting problems:", error);
        throw error;
    }
};

const sortOptions = {
    ALPHABETICAL_ASC: "Alphabetical (A-Z)",
    ALPHABETICAL_DESC: "Alphabetical (Z-A)",
    DATE_ADDED_ASC: "Date Added (Old - New)",
    DATE_ADDED_DESC: "Date Added (New - Old)",
    DIFFICULTY_ASC: "Difficulty (Low - High)",
    DIFFICULTY_DESC: "Difficulty (High - Low)",
};

const difficultyOptions = {
    0: "Easy",
    1: "Medium",
    2: "Hard",
    3: "Expert",
};

const typeOptionsDataStructure = {
    0: "String",
    1: "Array",
    2: "Linked List",
    3: "Stack",
    4: "Queue",
    5: "Tree",
    6: "Graph",
    7: "Matrix",
    8: "Hash Table",
    9: "Set",
};

const typeOptionsApproach = {
    0: "Greedy",
    1: "Divide and Conquer",
    2: "Dynamic Programming",
    3: "Backtracking",
    4: "Greedy",
    5: "Bit Manipulation",
    6: "Math",
    7: "Binary Search",
    8: "Binary Tree",
    9: "Recursion",
    10: "Divide and Conquer",
    11: "Sorting",
    12: "Searching",
    13: "Heap",
    14: "BFS (Breadth-First Search)",
    15: "DFS (Depth-First Search)",
    16: "Topological Sort",
};

const filterOptions = {
    difficulty: difficultyOptions,
    dataStructure: typeOptionsDataStructure,
    algorithm: typeOptionsApproach
};
