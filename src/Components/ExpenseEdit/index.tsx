import { useEffect, useState } from "react";
import * as api from "../../Services/apiService";
import Bag from "../../Objects/Bag";
import Category from "../../Objects/Category";
import Expense from "../../Objects/Expense";
import ExpenseTag from "../../Objects/ExpenseTag";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { debug } from "console";
import TagGroup from "../../Objects/TagGroup";
import Tag from "../../Objects/Tag";

import dayjs, { Dayjs } from 'dayjs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from "@mui/material";


export function ExpenseEdit() {
  let { expenseId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  //console.log("expenseid param:", expenseId);

  let navigate = useNavigate();
  const [bags, setBags] = useState<Bag[]>();
  const [categories, setCategories] = useState<Category[]>();
  const [tags, setTags] = useState<ExpenseTag[]>([]);
  const [tagGroups, setTagGroups] = useState<TagGroup[]>([])//for adding new
  const [selectedTagGroup, setSelectedTagGroup] = useState<number>(-1);
  const [allTags, setAllags] = useState<Tag[]>([])
  const [selectedNewTag, setSelectedNewTag] = useState<Tag>();

  const [expense, setExpense] = useState<Expense | null>(null);

  function formatISODate(date: Date | null): string {
    if (date == null) {
      return "";
    } else {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  }

  useEffect(() => {
    const getExpense = async () => {
      let data = await api.getExpense(Number(expenseId));
      if (data != null) {
        setExpense(data);
        console.log("setExpense data", data);
      }
    };
    if (expenseId != null) {
      getExpense();
    }
  }, [expenseId]);

  useEffect(() => {
    console.log("useEffect getCategories bagId:", expense?.bagId)
    console.log("useEffect getCategories categoryId:", expense?.categoryId)
    const getCategories = async () => {
      if (expense?.bagId != null) {
        const data = await api.getCategories(expense.bagId);
        setCategories(data);
        if (expense.expenseId == null && expenseId == null && data) {
          console.log("set category id as ", data[0].categoryId)
          setExpense({ ...expense, categoryId: data[0].categoryId } as Expense);
        }

        const categoryId: number = Number(searchParams.get('categoryId'));
        if (expense.categoryId == null && searchParams.get('categoryId') != undefined) {
          console.log("set category id2 as ", data[0].categoryId)
          setExpense({ ...expense, categoryId: categoryId } as Expense);
        }
      }
    };
    getCategories();
  }, [expense?.bagId]);

  useEffect(() => {

    const getBags = async () => {
      console.log("getBags")
      const data = await api.bagsGet();
      if (expense?.expenseId == null && expenseId == null) {
        console.log("expense.expenseId == null && expenseId == null", data[0].bagId)
        setExpense({ ...expense, bagId: data[0].bagId } as Expense);
        //setExpense({ ...expense, bagId: 5 } as Expense);
      }
      console.log("SearchParams", searchParams.get('bagId'))
      if (searchParams.get('bagId') != undefined) {
        const bagId: number = Number(searchParams.get('bagId'));

        //this should no be called for edit
        console.log("bagId != undefined", bagId)
        setExpense({ ...expense, bagId: bagId } as Expense);
        //setExpense({ ...expense, bagId: 4 } as Expense);

      }
      setBags(data);
    };

    getBags();
  }, []);

  useEffect(() => {
    const setDate = () => {
      if (expense && expense.date == null) {
        var d = dayjs().format('YYYY-MM-DD')
        console.log("Date:", d);

        setExpense({ ...expense, date: d })
      }
    }
    setDate()
  }, [expense, expense?.expenseId])

  useEffect(() => {
    const getTags = async () => {
      if (expenseId) {
        const data = await api.getTags([Number(expenseId)])
        setTags(data);
        console.log("Tags", data);
      }
    }
    getTags();
  }, [])

  useEffect(() => {
    const getTagGroup = async () => {
      if (expense?.categoryId) {
        const data = await api.getTagGroupForCategory(expense?.categoryId)
        setTagGroups(data);
        console.log("tagGroup", data);
        if (data.length > 0) {
          setSelectedTagGroup(data[0].tagGroupId);
        }
      }
    }
    getTagGroup();
  }, [expense?.categoryId])

  useEffect(() => {
    const getTags = async () => {
      var data = await api.getTagsByTagGroupId(selectedTagGroup);
      setAllags(data);
    }
    getTags();
  }, [selectedTagGroup])

  const save = async () => {
    console.log("Save expense", expense)
    if (expense) {
      var r = await api.saveExpense(expense);
      var r2 = await api.saveTags(expense, tags);
    }
    navigate("/Expenses?bagId=" + expense?.bagId + "&categoryId=" + expense?.categoryId);
  };

  const updateStringValue = (e: any) => {
    setExpense({ ...expense, [e.target.name]: e.target.value } as Expense);
  };

  const updateNumberValue = (e: any) => {
    console.log("numbervalue", e.target.value);
    let valueString: string = e.target.value;
    let valueFloat = parseFloat(valueString.replace(",", "."));

    let stringName: string = e.target.name;
    let name: string = stringName.replace("String", "");
    console.log("Updading", stringName)
    setExpense({ ...expense, [name]: valueFloat, [stringName]: valueString } as Expense);
  };

  const removeTag = (expenseTagId: number | null) => {
    if (expenseTagId) {
      var result = api.removeTagFromExpense(expenseTagId);
      let newTags: ExpenseTag[] = [...tags]
      newTags = newTags.filter(x => x.expenseTagId != expenseTagId);
      setTags(newTags);
    }
  }



  const addTagToExpense = () => {
    console.log("selectedNewTag", selectedNewTag)
    console.log("tags", tags)
    if (expense?.expenseId && selectedNewTag) {
      let newTag: ExpenseTag = {
        expenseId: expense.expenseId,
        expenseTagId: null,
        tag: selectedNewTag,
        tagId: selectedNewTag!.tagId!
      }
      let newTags: ExpenseTag[] = [...tags, newTag]
      setTags(newTags);
    }
  }

  return (
    <div>
      <p>
        Name:{expense?.name} bagid: {expense?.bagId}, categoryId:{expense?.categoryId}, date:{String(expense?.date)},
        amount: {expense?.amount}, price: {expense?.price}, priceString:{expense?.priceString} deductions:{expense?.deductions}, additions:{" "}
        {expense?.additions}, comment:{expense?.comment}

      </p>
      <p>
        Name
        {/* <input type="text" name="name" value={expense?.name || ""} onChange={updateStringValue}></input> */}
        <TextField name="name" value={expense?.name} onChange={updateStringValue}></TextField>
      </p>
      <p>
        Bag
        <select name="bagId" value={expense?.bagId || -1} onChange={updateNumberValue}>
          {bags?.map((oneBag) => {
            return (
              <option key={oneBag.bagId} value={oneBag.bagId!}>
                {oneBag.name}
              </option>
            );
          })}
        </select>
      </p>
      <p>
        Category
        <select name="categoryId" value={expense?.categoryId || -1} onChange={updateNumberValue}>
          {categories?.map((category) => {
            return (
              <option key={category.categoryId} value={category.categoryId || -1}>
                {category.name}
              </option>
            );
          })}
        </select>
      </p>
      <p>
        <DatePicker format="YYYY.MM.DD" value={dayjs(expense?.date)} onChange={updateStringValue} />
        {/* Date<input name="date" type="text" value={expense?.date || ""} onChange={updateStringValue}></input> (2024-11-29) */}
      </p>
      <p>

        {/* Amount<input name="amountString" type="text" value={expense?.amount || 0} onChange={updateNumberValue}></input> */}
        <TextField label="Amount" name="amountString" value={expense?.amount} onChange={updateNumberValue}></TextField>

      </p>
      <p>

        {/* <input name="priceString" type="text" value={expense?.priceString || ""} onChange={updateNumberValue}></input> */}
        <TextField label="Price" name="priceString" value={expense?.priceString} onChange={updateNumberValue}></TextField>

      </p>
      <p>
        <TextField label="Value" value={(expense?.price || 0) * (expense?.amount || 0)}></TextField>

        {/* Value<input type="text" disabled={true}></input> */}
      </p>
      <p>
        {/* Deductions
        <input
          name="deductionsString"
          type="text"
          value={expense?.deductionsString || ""}
          onChange={updateNumberValue}
        ></input> */}
        <TextField label="Deductions" name="deductionsString" value={expense?.deductionsString} onChange={updateNumberValue}></TextField>

      </p>
      <p>
        {/* Additions */}
        <TextField label="Additions" name="additionsString" value={expense?.additionsString} onChange={updateNumberValue}></TextField>

        {/* <input
          name="additionsString"
          type="text"
          value={expense?.additionsString || ""}
          onChange={updateNumberValue}
        ></input> */}
      </p>
      <p>
        {/* Cost<input type="text" disabled={true}></input> */}
        <TextField label="Cost" value={Math.round(100 * ((expense?.price || 0) * (expense?.amount || 0) + (expense?.additions || 0) - (expense?.deductions || 0))) / 100} onChange={updateNumberValue}></TextField>

      </p>
      <p>
        {/* Comment<input name="comment" type="text" value={expense?.comment || ""} onChange={updateStringValue}></input> */}
        <TextField label="Comment" name="comment" value={expense?.comment} onChange={updateStringValue}></TextField>

      </p>
      <span>Tags: {tags && tags.map(x => {
        return (<span>{x?.tag?.name} <button onClick={() => removeTag(x.expenseTagId)}>Remove</button> |</span>)
      })}</span>
      <hr></hr>
      <button onClick={save}>Save</button>
      <button
        onClick={() => {
          navigate("/Expenses");
        }}
      >
        Cancel
      </button>
      <hr></hr>
      <span>categories groups:
        <select onChange={(event) => setSelectedTagGroup(Number(event.target.value))}>
          {tagGroups.map(x => <option onChange={() => setSelectedTagGroup(x.tagGroupId)} value={x.tagGroupId}>{x.name}</option>)}
        </select>
        <span>selectedagGroup={selectedTagGroup}</span>
        <select onChange={(event) => setSelectedNewTag(allTags[Number(event.target.value)])}>
          {allTags.map((option, index) => <option key={index} value={index} >{option.name}</option>)}
        </select></span>
      <button onClick={addTagToExpense}>Add tag</button>

    </div>
  );
}
