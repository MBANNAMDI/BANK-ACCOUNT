/// Business Logic for Bank ---------
function Bank() {
  this.accounts = {};
  this.currentId = 20222018858;
}
Bank.prototype.assignId = function () {
  this.currentId += 11256;
  return this.currentId;
};
Bank.prototype.addAccount = function (task) {
  task.id = this.assignId();
  this.accounts[task.id] = task;
}
Bank.prototype.findAccount = function (id) {
  if (this.accounts[id] != undefined) {
      return this.accounts[id];
  }
  return false;
};

Bank.prototype.deleteAccount = function (id) {
  if (this.accounts[id] === undefined) {
      return false;
  }
  delete this.accounts[id];
  return true;
};


function Account(name, number, amount,accounttype) {
  this.name = name;
  this.number = number;
  this.amount = parseInt(amount);
  this.accounttype = accounttype;
  this.history = ["Credit:$" + amount]
}

Account.prototype.makeDeposit = function (amount) {
  $("#warn").hide();
  this.amount =  this.amount + parseInt(amount);
  this.history.push("Credit:$" + amount);
}

Account.prototype.makeWithdrawl = function (amount) {
  if (amount > this.amount) {
    confirm("ehhhn! U be theif ? Ogbeni you broke jooo! ")
    $("#warn").show();
  } else {
    $("#warn").hide();
    this.amount = this.amount- parseInt(amount);
  this.history.push("Debit:$" + amount);
  }
}


Account.prototype.getHistory = function () {
  let output = "";
  for (let i = 0; i < this.history.length; i++) {
    if (this.history[i].toString().includes("Debit")) {
      output += "<span class='negative'>" + this.history[i] + "</span>";
    } else {
      output += this.history[i];
    }
    if (i < this.history.length - 1) {
      output += ", ";
    }
  }
  return output;
}

function displayAccountDetails(listToDisplay) {
  let accountsList = $("ol#accounts");
  let htmlForAccountInfo = "";
  Object.keys(listToDisplay.accounts).forEach(function (key) {
      const task = listToDisplay.findAccount(key);
      htmlForAccountInfo += "<li id=" + task.id + ">" + task.name  + "</li>";
  });
  accountsList.html(htmlForAccountInfo);
}


function showAccount(taskId) {
  const task = list.findAccount(taskId);
  $("#output").show();
  $(".name").html(task.name);
  $(".number").html(task.number);
  $(".accnum").html(task.id);
  $(".amount").html("$" + task.amount);
  $(".accounttype").html(task.accounttype);
  $(".accHistory").html(task.getHistory());
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='btn btn-danger' id=" + + task.id + ">Delete</button>");
}

  function withdrawal(amount,id ){
    list.findAccount(id).makeWithdrawl(amount);
    showAccount(id)
      
   }

   function deposit(amount,id ){
    list.findAccount(id ).makeDeposit(amount);
    showAccount(id)
   }

   function transfer(amount,firstId,secondId ){
    list.findAccount(firstId ).makeWithdrawl(amount);
    list.findAccount(secondId ).makeDeposit(amount);
    showAccount(firstId)
   }


function getSelectedAccount() {
  return parseInt($("#accounts").children(":selected").attr("id"));
}


function attachAccountListeners() {

  $("ol#accounts").on("click", "li", function () {
      showAccount(this.id);
  });
  $("#buttons").on("click", "button", function () {
      list.deleteAccount(this.id);
      $("#output").hide();
      displayAccountDetails(list);
  });
}

// User Interface Logic ---------
let list = new Bank();

let newAccount

$(document).ready(function () {
  attachAccountListeners();

    $("form#withdraw-account").submit(function (event) {
    event.preventDefault();
    const  inputtedAmount2 = parseInt($("input#amount2").val());
    const  inputtedAccno = parseInt($("input#no").val());
     withdrawal(inputtedAmount2,inputtedAccno); 
  });


  $("form#deposit-account").submit(function (event) {
    event.preventDefault();
    const  inputtedAmount3 = parseInt($("input#amount3").val());
    const  inputtedAccno3 = parseInt($("input#no3").val());
     deposit(inputtedAmount3,inputtedAccno3); 
  });

  $("form#trans-account").submit(function (event) {
    event.preventDefault();
    const  inputtedAmount4 = parseInt($("input#amount4").val());
    const  inputtedAccno4 = parseInt($("input#no4").val());
    const  inputtedAccno5 = parseInt($("input#no5").val());
     transfer(inputtedAmount4,inputtedAccno4,inputtedAccno5); 
  });


  $("form#new-account").submit(function (event) {
      event.preventDefault();
      const inputtedName = $("input#name").val()
      const inputtedNumber = $("input#number").val();
      const inputtedAmount = $("input#amount").val();
      const inputtedAccountType = $("select#accounttype").val();
     
      // The next three lines are new:
      $("input#new-first-name").val("");
      $("input#new-last-name").val("");
      $("input#new-phone-number").val("");

      newAccount = new Account(inputtedName, inputtedNumber, inputtedAmount,inputtedAccountType);
      list.addAccount(newAccount);
      displayAccountDetails(list);


 });

});



