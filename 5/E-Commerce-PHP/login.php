<?php
include 'header.php';
?>
<main class="flex-shrink-0">
    <div class="container mt-5 pt-5">
        <br class="mt-5 pt-5">
        <form action="action_page.php?action=login" method="post">
            <div>
                <label for="email" id="emailLabel">Email</label>
                <br>
                <input type="email" id="email" name="email" placeholder="ex@example.com" required>
                <br>
                <label for="password" id="passwordLabel">Password</label>
                <br>
                <input type="password" id="password" name="password" placeholder="password" required>
                <br><br>
                <input type="submit" value="Login" class="btn login">
            </div>
        </form>
    </div>
</main>
<?php
include 'footer.php';
